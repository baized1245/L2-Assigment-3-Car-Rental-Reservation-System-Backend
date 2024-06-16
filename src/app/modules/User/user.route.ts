import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SignupUserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/auth/signup',
  // validateRequest(SignupUserValidation.signupUserValidationSchema)
  UserControllers.signUpUser,
);

router.post(
  '/auth/signin',
  // validateRequest(SignupUserValidation.signupUserValidationSchema)
  UserControllers.signInUser,
);

export const UserRoutes = router;
