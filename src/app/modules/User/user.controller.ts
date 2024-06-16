import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UsersServices } from './user.service';

const signUpUser = catchAsync(async (req, res) => {
  const result = await UsersServices.signUpUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully!',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
      phone: result.phone,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  });
});

const signInUser = catchAsync(async (req, res) => {
  const result = await UsersServices.signInUserService(req.body);

  const { user } = result;
  // console.log(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
      phone: result.phone,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
    // data: { result },
    token: result.token,
  });
});

export const UserControllers = {
  signUpUser,
  signInUser,
};
