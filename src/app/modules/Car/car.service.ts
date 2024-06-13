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

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateACarFromDB,
  deleteCarFromDB,
};
