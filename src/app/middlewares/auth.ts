// import { NextFunction, Request, Response } from 'express';
// import catchAsync from '../utils/catchAsync';
// import AppError from '../errors/AppError';
// import httpStatus from 'http-status';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../config';
// import { TUserRole } from '../modules/user/user.interface';
// import { User } from '../modules/user/user.models';

// const auth = (...requiredRoles: TUserRole[]) => {
//     return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//         const token = req.headers.authorization;

//         // check if the token is missing
//         if (!token) {
//             throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
//         }

//         // check if the given token is valid
//         const decoded = jwt.verify(
//             token,
//             config.jwt_access_secret as string,
//         ) as JwtPayload;

//         const { role, userId, iat } = decoded;

//         //checking if the user is exist

//         const user = await User.isUserExistsByCustomId(userId);

//         if (!user) {
//             throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
//         }

//         // checking if the user is already deleted

//         const isDeleted = user?.isDeleted;

//         if (isDeleted) {
//             throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted!');
//         }

//         // checking if the user is blocked

//         const userStatus = user?.status;

//         if (userStatus === 'blocked') {
//             throw new AppError(httpStatus.NOT_FOUND, 'This user is blocked!');
//         }

//         if (
//             user.passwordChangedAt &&
//             User.isJWTIssuedBeforePasswordChanged(
//                 user.passwordChangedAt,
//                 iat as number,
//             )
//         ) {
//             throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
//         }

//         if (requiredRoles && !requiredRoles.includes(role)) {
//             throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
//         }

//         req.user = decoded as JwtPayload;
//         next();
//     });
// };

// export default auth;

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import config from '../config';

// Middleware to authenticate the token
const authMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
      const decoded = jwt.verify(token, config.jwt_access_secret as string); // Replace 'your_secret_key' with your actual secret key
      req.user = decoded as JwtPayload; // Attach decoded token to request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
);

// Middleware to authorize only admin users
const adminMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if the user is an admin
    if (req.user && req.user.role === 'admin') {
      // Assuming your token payload contains a 'role' field
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  },
);

// Middleware to authorize only users
const userMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if the user is an admin
    if (req.user && req.user.role === 'user') {
      // Assuming your token payload contains a 'role' field
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(403).json({ message: 'Forbidden: user only' });
    }
  },
);

export { authMiddleware, adminMiddleware, userMiddleware };
