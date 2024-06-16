import { Request, Response } from 'express';
import { BookingServices } from './booking.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FilterQuery } from 'mongoose';
import { TBooking } from './booking.interface';
import { NotFoundResponse } from '../../utils/noDataFoundResponse';

// Create a booking (user only)
const createABooking = catchAsync(async (req: Request, res: Response) => {
  // Extract the user object from req.user
  const user = req.user;

  if (!user) {
    return res.status(400).json({ message: 'User not found in request' });
  }

  const { carId, date, startTime } = req.body;

  const bookingData = {
    date,
    startTime,
    userId: user._id,
    carId,
  };

  const result = await BookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully!',
    data: result,
  });
});

// Get all bookings (admin only)
const getAllBookings = catchAsync(async (req, res) => {
  const searchTerm: FilterQuery<TBooking> = {};

  console.log({ searchTerm });

  // Dynamically build the search criteria based on query parameters
  if (req.query.carId) {
    searchTerm.car = req.query.carId as string;
  }

  if (req.query.date) {
    searchTerm.date = req.query.date as string;
  }

  const result = await BookingServices.getAllBookingFromDB(searchTerm);

  console.log({ result });

  if (!result || result.length === 0) {
    return NotFoundResponse(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully!',
    data: result,
  });
});

// Get my bookings (user only)
const getMyBookings = catchAsync(async (req, res) => {
  // Extract user from request
  const user = req.user;

  // Get bookings from the database
  const result = await BookingServices.getMyBookingFromDB({
    email: user.email,
  });

  if (!result || result.length === 0) {
    return NotFoundResponse(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully!',
    data: result,
  });
});

// Return a car (admin only)
const returnACar = catchAsync(async (req: Request, res: Response) => {
  const { bookingId, endTime } = req.body;

  const result = await BookingServices.returnCarToDB(bookingId, endTime);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car returned successfully!',
    data: result,
  });
});

export const BookingControllers = {
  createABooking,
  getAllBookings,
  getMyBookings,
  returnACar,
};
