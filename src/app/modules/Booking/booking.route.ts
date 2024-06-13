import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = express.Router();

// Booking create route
router.post(
  '/bookings',
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingControllers.craeteABooking,
);

// Booking retrive route
router.get('/bookings', BookingControllers.getAllBookings);

export const BookingRoutes = router;
