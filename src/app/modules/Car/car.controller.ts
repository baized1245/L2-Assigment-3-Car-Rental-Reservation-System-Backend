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

//get single car by _id
const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car retrieved successfully!',
    data: result,
  });
});

//Update a car
const updateACar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await CarServices.updateACarFromDB(id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car updated successfully!',
    data: result,
  });
});

//Delete car (soft delete)
const deleteACar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car deleted successfully!',
    data: result,
  });
});

export const CarControllers = {
  craeteCar,
  getAllCars,
  getSingleCar,
  updateACar,
  deleteACar,
};
