import { TCar } from './car.interface';
import { Car } from './car.model';

// Creating car Into DB
const createCarIntoDB = async (CarData: TCar) => {
  const result = await Car.create(CarData);

  return result;
};

export const CarServices = {
  createCarIntoDB,
};
