import express from 'express';
import { CarControllers } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidation } from './car.validation';
import { adminMiddleware, authMiddleware } from '../../middlewares/auth';

const router = express.Router();

// Car create route
router.post(
  '/cars',
  authMiddleware,
  adminMiddleware,
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
  authMiddleware,
  adminMiddleware,
  validateRequest(CarValidation.updateCarSchemaValidation),
  CarControllers.updateACar,
);

//Return a car route
router.put('/cars/return', CarControllers.returnACar);

//Delete a car route
router.delete(
  '/cars/:id',
  authMiddleware,
  adminMiddleware,
  CarControllers.deleteACar,
);

export const CarRoutes = router;
