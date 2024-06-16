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
  const result = await Car.findByIdAndUpdate(id, { isDeleted: true });

  return result;
};

/**
 * Return the car associated with a booking, update booking details,
 * and set car status to 'available'. This operation is accessible only to administrators.
 * @param {string} bookingId - The ID of the booking to process.
 * @param {string} endTime - The end time of the booking in HH:mm format.
 * @returns {Promise<object>} - Updated booking object including total cost calculation.
 * @throws {Error} - Throws error if booking or car details are not found, or if any operation fails.
 */
const returnTheCarFromUser = async (
  bookingId: string,
  endTime: string,
): Promise<object> => {
  try {
    // Find the booking by ID and populate car and user details
    const booking = await Booking.findById(bookingId)
      .populate('car')
      .populate('user');

    // Throw error if booking is not found
    if (!booking) {
      throw new Error('Booking not found');
    }

    // Ensure booking has a valid car object and retrieve it as TCar type
    const car = booking.car as unknown as TCar;

    // Throw error if car details are not found or incomplete
    if (!car || !car._id || !car.pricePerHour) {
      throw new Error('Car details not found');
    }

    // Update the end time of the booking
    booking.endTime = endTime;

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

    // Throw error if car to update is not found
    if (!carToUpdate) {
      throw new Error('Car not found for status update');
    }

    // Set car status to 'available' and save
    carToUpdate.status = 'available';
    await carToUpdate.save();

    // Return the updated booking object
    return booking.toObject();
  } catch (error) {
    // Catch and re-throw any errors encountered
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

// // Return the car from user (admin only)
// const returnTheCarFromUser = async (bookingId: string, endTime: string) => {
//   // Find the booking by ID and populate car details
//   const booking = await Booking.findById(bookingId).populate('car').populate('user');

//   console.log({ booking });

//   if (!booking) {
//     throw new Error("Booking not found");
//   }

//   const car = booking.car as unknown as TCar;

//   if (!car || !car.pricePerHour) {
//     throw new Error("Car details not found");
//   }

//   // Update the end time of the booking
//   booking.endTime = endTime;

//   // Calculate the total cost based on start time, end time, and car's price per hour
//   const startHour = parseInt(booking.startTime.split(":")[0]);
//   const startMinute = parseInt(booking.startTime.split(":")[1]);
//   const endHour = parseInt(endTime.split(":")[0]);
//   const endMinute = parseInt(endTime.split(":")[1]);

//   const startDate = new Date(`1970-01-01T${booking.startTime}:00Z`);
//   const endDate = new Date(`1970-01-01T${endTime}:00Z`);

//   const durationInHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
//   booking.totalCost = durationInHours * car.pricePerHour;

//   // Save the updated booking
//   await booking.save();

//   // Update car status to available
//   const carToUpdate = await Car.findById(car._id);
//   if (carToUpdate) {
//     carToUpdate.status = 'available';
//     await carToUpdate.save();
//   } else {
//     throw new Error("Car not found for status update");
//   }

//   return booking;
// };
//returnTheCarFromUser
