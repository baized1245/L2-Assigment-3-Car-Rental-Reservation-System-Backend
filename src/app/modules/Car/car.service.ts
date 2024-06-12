import { TCar } from './car.interface';
import { Car } from './car.model';

// Creating car Into DB
const createCarIntoDB = async (CarData: TCar) => {
    const result = await Car.create(CarData);

    return result;
};

// Get all car from DB
const getAllCarFromDB = async () => {
    const result = await Car.find();

    return result;
};

export const CarServices = {
    createCarIntoDB,
    getAllCarFromDB
};
