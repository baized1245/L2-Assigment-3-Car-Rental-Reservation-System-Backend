import express from 'express';
// import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/auth/signin',

  AuthController.signInUser,
);

export const AuthRoutes = router;
