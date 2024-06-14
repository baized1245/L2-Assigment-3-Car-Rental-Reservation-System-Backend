import { TBooking } from '../Booking/booking.interface';
import { Booking } from '../Booking/booking.model';
import { TCar } from './car.interface';
import { Car } from './car.model';

// Creating car Into DB
const createCarIntoDB = async (carData: TCar) => {
  const result = await Car.create(carData);

  return result;
};

// Get all car from DB
const getAllCarFromDB = async () => {
  const result = await Car.find({ isDeleted: false });

  return result;
};

// Get single car from DB
const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);

  return result;
};

// Update a car from DB
const updateACarFromDB = async (id: string, updateData: Partial<TCar>) => {
  const options = { new: true };
  const result = await Car.findByIdAndUpdate(id, updateData, options);

  return result;
};

// Delete a car from DB
const deleteCarFromDB = async (id: string) => {
  const result = await Car.findByIdAndUpdate(id, { isDeleted: true });

  return result;
};

// const returnTheCarFromUser = async (bookingId: string, endTime: string) => {
//   const booking = await Booking.findById(bookingId).populate('car');

//   if (!booking) {
//     throw new Error("Booking not found");
//   }

//   // Update the end time
//   booking.endTime = endTime;

//   const status = await Car.

//   // // Calculate the total cost
//   // const startHour = parseInt(booking.startTime.split(":")[0]);
//   // const startMinute = parseInt(booking.startTime.split(":")[1]);
//   // const endHour = parseInt(endTime.split(":")[0]);
//   // const endMinute = parseInt(endTime.split(":")[1]);

//   // const startDate = new Date(booking.date);
//   // startDate.setHours(startHour, startMinute);

//   // const endDate = new Date(booking.date);
//   // endDate.setHours(endHour, endMinute);

//   // const durationInHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
//   // booking.totalCost = durationInHours * booking.car.pricePerHour;

//   // Save the updated booking
//   await booking.save();

//   // Update car status to available
//   booking.car.status = 'available';
//   await booking.car.save();

//   return booking;
// };

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateACarFromDB,
  deleteCarFromDB,
  // returnTheCarFromUser
};
