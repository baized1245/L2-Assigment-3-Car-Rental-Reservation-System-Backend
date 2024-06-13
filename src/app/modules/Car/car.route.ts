import express from 'express';
import { CarControllers } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidation } from './car.validation';

const router = express.Router();

// Car create route
router.post(
  '/cars',
  validateRequest(CarValidation.createCarSchemaValidation),
  CarControllers.craeteCar,
);

// All cars get route
router.get('/cars', CarControllers.getAllCars);

// Single car get route
router.get('/cars/:id', CarControllers.getSingleCar);

//Update a car route
router.put(
  '/cars/:id',
  validateRequest(CarValidation.updateCarSchemaValidation),
  CarControllers.updateACar,
);

//Delete a car route
router.delete('/cars/:id', CarControllers.deleteACar);

export const CarRoutes = router;
