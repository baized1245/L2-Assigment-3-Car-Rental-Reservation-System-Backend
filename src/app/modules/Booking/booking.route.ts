import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

// Booking create route (user only)
router.post(
  '/bookings',
  auth(USER_ROLE.user),
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingControllers.createABooking,
);

// Get All Booking retrieve route (admin only)
router.get(
  '/bookings',
  auth(USER_ROLE.admin),
  BookingControllers.getAllBookings,
);

// Get My Booking retrieve route (user only)
router.get(
  '/bookings/my-bookings',
  auth(USER_ROLE.user),
  BookingControllers.getMyBookings,
);

// Return Car route (admin only)
router.put(
  '/bookings/return',
  auth(USER_ROLE.admin),
  validateRequest(bookingValidation.returnCarValidationSchema),
  BookingControllers.returnACar,
);

export const BookingRoutes = router;
