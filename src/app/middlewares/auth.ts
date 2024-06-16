import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/User/user.model';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check if the authorization header is present and properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Authorization header is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token with the secret key
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload & { _id: string; role: string; userEmail: string };

      const user = await User.findOne({ email: decoded.userEmail });
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
      }

      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // Attach the full user object to req.user
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  });
};

export default auth;
