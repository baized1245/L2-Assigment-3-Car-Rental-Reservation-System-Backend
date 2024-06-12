import express from 'express';
// import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../User/user.validation';

const router = express.Router();

router.post('/auth/signin', AuthController.signInUser);

router.post(
  '/auth/signup',
  validateRequest(UserValidation.userValidationSchema),
  AuthController.craeteUser,
);

export const AuthRoutes = router;
