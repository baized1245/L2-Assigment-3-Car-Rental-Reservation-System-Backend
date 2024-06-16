import AppError from '../../errors/AppError';
import { Booking } from '../Booking/booking.model';
import { TCar } from './car.interface';
import { Car } from './car.model';

// Creating car Into DB (admin service)
const createCarIntoDB = async (carData: TCar) => {
  const result = await Car.create(carData);

  return result;
};

// Get all car from DB (public service)
const getAllCarFromDB = async () => {
  const result = await Car.find({ isDeleted: false });

  return result;
};

// Get single car from DB (public service)
const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);

  return result;
};

// Update a car from DB (admin service)
const updateACarFromDB = async (id: string, updatedData: Partial<TCar>) => {
  const options = { new: true };
  const result = await Car.findByIdAndUpdate(id, updatedData, options);

  return result;
};

// Delete a car from DB
const deleteCarFromDB = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );

  return result;
};

// Return a car (admin only)
const returnTheCarFromUser = async (
  bookingId: string,
  endTime: string,
): Promise<object> => {
  try {
    // Find the booking by ID and populate car and user details
    const booking = await Booking.findById(bookingId)
      .populate('car')
      .populate('user');

    if (!booking) {
      throw new AppError(404, 'Booking not found');
    }

    const car = booking.car as unknown as TCar;

    if (!car || !car._id || !car.pricePerHour) {
      throw new Error('Car details not found');
    }

    // Update the end time of the booking
    booking.endTime = endTime;

    // Validate the endTime is less than startTime
    if (
      new Date(`1970-01-01T${endTime}:00Z`) >=
      new Date(`1970-01-01T${booking.startTime}:00Z`)
    ) {
      throw new Error('The end time must be less than the start time');
    }

    // Calculate total cost based on start time, end time, and car's price per hour
    const startDate = new Date(`1970-01-01T${booking.startTime}:00Z`);
    const endDate = new Date(`1970-01-01T${endTime}:00Z`);
    const durationInHours =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    booking.totalCost = durationInHours * car.pricePerHour;

    // Save the updated booking
    await booking.save();

    // Update car status to 'available'
    const carToUpdate = await Car.findById(car._id);

    if (!carToUpdate) {
      throw new Error('Car not found for status update');
    }

    // Set car status to 'available' and save
    carToUpdate.status = 'available';
    await carToUpdate.save();

    return booking.toObject();
  } catch (error) {
    throw new Error(`Error returning car: ${error}`);
  }
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateACarFromDB,
  deleteCarFromDB,
  returnTheCarFromUser,
};
