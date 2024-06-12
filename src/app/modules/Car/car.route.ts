import express from 'express';
import { CarControllers } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidation } from './car.validation';

const router = express.Router();

router.post(
    '/cars',
    validateRequest(CarValidation.carSchemaValidation),
    CarControllers.craeteCar,
);

router.get(
    '/cars',
    CarControllers.getAllCars,
);

export const CarRoutes = router;
