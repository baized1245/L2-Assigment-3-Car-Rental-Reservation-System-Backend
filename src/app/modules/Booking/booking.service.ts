import { FilterQuery } from 'mongoose';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

// Creating booking Into DB
const createBookingIntoDB = async (bookingData: TBooking) => {
  // Extract carId from bookingData
  const { carId, ...rest } = bookingData as any;

  // Create a new booking object with car field
  const newBookingData = {
    ...rest,
    car: carId,
  };

  const result = await Booking.create(newBookingData);

  return result;
};

// Get all bookings Into DB
const getAllBookingFromDB = async (searchTerm: FilterQuery<TBooking>) => {
  const result = await Booking.find(searchTerm)
    .populate('user')
    .populate('car');

  if (result.length === 0) {
    throw new Error('No data found');
  }

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
};
