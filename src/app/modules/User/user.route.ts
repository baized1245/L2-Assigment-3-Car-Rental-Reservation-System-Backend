import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/auth/signup', UserControllers.craeteUser);

export const UserRoutes = router;
