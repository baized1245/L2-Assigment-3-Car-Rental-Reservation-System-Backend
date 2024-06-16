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

// import { NextFunction, Request, Response } from 'express';
// import { TUserRole } from "../modules/User/user.interface";
// import catchAsync from "../utils/catchAsync";
// import AppError from '../errors/AppError';
// import httpStatus from 'http-status';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../config';
// import { User } from '../modules/User/user.model';

// const auth = (...requiredRoles: TUserRole[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     const authHeader = req.headers.authorization;

//     // Check if the authorization header is present and properly formatted
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res
//         .status(401)
//         .json({ message: 'Authorization header is missing or invalid' });
//     }

//     const token = authHeader.split(' ')[1];

//     // const token = req.headers.authorization;

//     // check if the token is missing
//     if (!token) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
//     }

//     // check if the given token is valid
//     const decoded = jwt.verify(
//       token,
//       config.jwt_access_secret as string,
//     ) as JwtPayload;

//     const { role, userEmail, iat } = decoded;

//     //checking if the user is exist

//     const user = await User.isUserExistsByEmail(decoded.userEmail);

//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
//     }

//     if (requiredRoles && !requiredRoles.includes(role)) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
//     }

//     req.user = decoded as JwtPayload;
//     next();
//   });
// };

// export default auth;
