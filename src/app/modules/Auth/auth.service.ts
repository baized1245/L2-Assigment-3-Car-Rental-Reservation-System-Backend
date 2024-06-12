import httpStatus from 'http-status';
import config from '../../config';
import { User } from '../User/user.model';
import { TSignIn } from './auth.interface';
import { createToken } from './auth.utils';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';

// Creating User Into DB
const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);

  return result;
};

// SignIn User Into DB
const signInUser = async (payLoad: TSignIn) => {
  //checking if the user is exist
  const user = await User.isUserExistsByEmail(payLoad.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  //checking the password is correct or not
  if (!(await User.isPasswordMatched(payLoad?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  // create token and send o the client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token,
  };
};

export const AuthServices = {
  signInUser,
  createUserIntoDB,
};
