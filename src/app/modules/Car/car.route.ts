import express from 'express';
import { CarControllers } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidation } from './car.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BookingControllers } from '../Booking/booking.controller';
// import { adminMiddleware, authMiddleware } from '../../middlewares/auth';

const router = express.Router();

// Car create route (admin only)
router.post(
  '/cars',
  auth(USER_ROLE.admin),
  // authMiddleware,
  // adminMiddleware,
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
  // authMiddleware,
  // adminMiddleware,
  validateRequest(CarValidation.updateCarSchemaValidation),
  CarControllers.updateACar,
);

// //Return a car route (admin only)
// router.put('/cars/return',
//   auth(USER_ROLE.admin),
//   validateRequest(CarValidation.returnCarSchemaValidation),
//   CarControllers.returnACar);

// // Return a car route (admin only)
// router.put(
//   '/cars/return',
//   auth(USER_ROLE.admin), // Ensure only admins can access this route
//   //validateRequest(CarValidation.returnCarSchemaValidation),
//   // Validate request body
//   BookingControllers.returnACar, // Route handler for returning a car
// );

//Delete a car route (admin only)
router.delete('/cars/:id', auth(USER_ROLE.admin), CarControllers.deleteACar);

export const CarRoutes = router;
