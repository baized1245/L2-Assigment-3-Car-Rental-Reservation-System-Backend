import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const craeteUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully!',
    data: result,
    // token: result?.token,
  });
});

const signInUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signInUser(req.body);

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
    token: result.token,
  });
});

export const AuthController = {
  signInUser,
  craeteUser,
};
