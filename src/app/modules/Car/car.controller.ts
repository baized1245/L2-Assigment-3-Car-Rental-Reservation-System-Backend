import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';


//Create a car
const craeteCar = catchAsync(async (req, res) => {
    const result = await CarServices.createCarIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Car created successfully!',
        data: result,
    });
});

//get all cars
const getAllCars = catchAsync(async (req, res) => {
    const result = await CarServices.getAllCarFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Cars retrived successfully!',
        data: result,
    });
});


export const CarControllers = {
    craeteCar,
    getAllCars
};
