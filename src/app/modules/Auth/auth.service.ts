// import httpStatus from 'http-status';
// import config from '../../config';
// import { User } from '../User/user.model';
// import { TLogin } from './auth.interface';
// import { createToken } from './auth.utils';
// import AppError from '../../errors/AppError';
// import { TUser } from '../User/user.interface';
// // import { generateToken } from './auth.utils';

// // Creating User Into DB
// const createUserIntoDB = async (userData: TUser) => {

//   //checking if the user is already exist
//   const user = await User.isUserExistsByEmail(userData.email);

//   if (user) {
//     throw new AppError(404, 'This user is already exist!');
//   }

//   const result = await User.create(userData);

//   return result;
// };

// // SignIn User Into DB
// const signInUser = async (payLoad: TLogin) => {

//   // console.log(await User.isUserExistsByEmail(payLoad.email));

//   // console.log(payLoad);
//   //checking if the user is exist
//   const user = await User.isUserExistsByEmail(payLoad.email);

//   // console.log({ user });

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
//   }

//   //checking the password is correct or not
//   if (!(await User.isPasswordMatched(payLoad?.password, user?.password)))
//     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

//   // create token and send to the client

//   const jwtPayload = {
//     userEmail: user.email,
//     role: user.role,
//   };

//   // console.log({ jwtPayload });

//   const token = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );
//   // console.log({ token });

//   return {
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     phone: user.phone,
//     address: user.address,
//     createdAt: user.createdAt,
//     updatedAt: user.updatedAt,
//     user: user,
//     token,
//   };
// };

// export const AuthServices = {
//   signInUser,
//   createUserIntoDB,
// };
