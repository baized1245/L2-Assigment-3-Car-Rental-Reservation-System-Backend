import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';
import { FilterQuery } from 'mongoose';
import { TBooking } from './booking.interface';

//Create a booking
const craeteABooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully!',
    data: result,
  });
});

//Get all bookings
const getAllBookings = catchAsync(async (req, res) => {
  const searchTerm: FilterQuery<TBooking> = {};

  // Dynamically build the search criteria based on query parameters
  if (req.query.carId) {
    searchTerm.car = req.query.carId as string;
  }

  if (req.query.date) {
    searchTerm.date = req.query.date as string;
  }

  const result = await BookingServices.getAllBookingFromDB(searchTerm);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully!',
    data: result,
  });
});

export const BookingControllers = {
  craeteABooking,
  getAllBookings,
};
