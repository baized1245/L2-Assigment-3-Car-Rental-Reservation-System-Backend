import mongoose, { FilterQuery, Types } from 'mongoose';
import { CreateBookingData, TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Car } from '../Car/car.model';
import { User } from '../User/user.model';

// Creating booking Into DB (user only)
const createBookingIntoDB = async (bookingData: CreateBookingData) => {
  const { carId, userId, date, startTime } = bookingData;

  // Ensure car exists and is available
  const car = await Car.findOne({ _id: carId, status: 'available' });
  if (!car) {
    throw new Error('Car not found or not available');
  }

  // Create a new booking object
  const newBookingData: Partial<TBooking> = {
    date,
    startTime,
    endTime: null,
    car: new Types.ObjectId(carId),
    user: new Types.ObjectId(userId),
    totalCost: 0,
  };

  // Create the booking
  const booking = await Booking.create(newBookingData);

  // Update the car status to unavailable
  await Car.findByIdAndUpdate(carId, { status: 'unavailable' });

  // Populate user and car fields
  const populatedBooking = await Booking.findById(booking._id)
    .populate('user')
    .populate('car')
    .exec();

  if (!populatedBooking) {
    throw new Error('Failed to populate booking data');
  }

  return populatedBooking;
};

// Get all bookings from DB (admin only)
const getAllBookingFromDB = async (searchTerm: FilterQuery<TBooking>) => {
  const result = await Booking.find(searchTerm)
    .populate('user')
    .populate('car');

  return result;
};

// Get bookings for a specific user
const getMyBookingFromDB = async (payLoad: { email: string }) => {
  // Find user by email
  const user = await User.findOne({ email: payLoad.email });

  if (!user) {
    throw new Error('User not found');
  }

  // Find bookings by user ID and populate user and car data
  const result = await Booking.find({ user: user._id })
    .populate('user')
    .populate('car');

  return result;
};

// Return a car and update the booking and car status
const returnCarToDB = async (bookingId: string, endTime: string) => {
  console.log('Booking ID:', bookingId); // Debugging log
  console.log('End Time:', endTime); // Debugging log

  // Validate the bookingId
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error('Invalid Booking ID');
  }

  // Find the booking by ID
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error('Booking not found');
  }

  // Check if the car is already returned
  if (booking.endTime) {
    throw new Error('Car is already returned');
  }

  // Validate the car ID
  if (!mongoose.Types.ObjectId.isValid(booking.car.toString())) {
    throw new Error('Invalid Car ID');
  }

  // Find the car by ID
  const car = await Car.findById(booking.car);

  if (!car) {
    throw new Error('Car not found');
  }

  // Update the booking end time and calculate total cost
  booking.endTime = endTime;

  const start = new Date(`1970-01-01T${booking.startTime}:00Z`).getTime();
  const end = new Date(`1970-01-01T${endTime}:00Z`).getTime();
  const durationInHours = (end - start) / (1000 * 60 * 60);
  booking.totalCost = durationInHours * car.pricePerHour;

  await booking.save();

  // Update the car status to available
  const updatedCar = await Car.findByIdAndUpdate(
    booking.car,
    { status: 'available' },
    { new: true },
  );

  if (!updatedCar) {
    throw new Error('Car could not be updated');
  }

  // Populate user and car fields in booking
  const populatedBooking = await Booking.findById(booking._id)
    .populate('user')
    .populate('car')
    .exec();

  if (!populatedBooking) {
    throw new Error('Failed to populate booking data');
  }

  return populatedBooking;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingFromDB,
  returnCarToDB,
};
