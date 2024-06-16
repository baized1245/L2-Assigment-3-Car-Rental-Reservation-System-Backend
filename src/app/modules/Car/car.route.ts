import express from 'express';
import { CarControllers } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidation } from './car.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BookingControllers } from '../Booking/booking.controller';

const router = express.Router();

// Car create route (admin only)
router.post(
  '/cars',
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.createCarSchemaValidation),
  CarControllers.craeteCar,
);

// All cars get route (public route)
router.get('/cars', CarControllers.getAllCars);

// Single car get route (public route)
router.get('/cars/:id', CarControllers.getSingleCar);

//Update a car route (admin only)
router.put(
  '/cars/:id',
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.updateCarSchemaValidation),
  CarControllers.updateACar,
);

//Delete a car route (admin only)
router.delete('/cars/:id', auth(USER_ROLE.admin), CarControllers.deleteACar);

export const CarRoutes = router;
