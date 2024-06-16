import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';
import { NotFoundResponse } from '../../utils/noDataFoundResponse';

//Create a car (admin controller )
const craeteCar = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Car created successfully!',
    data: result,
  });
});

//get all cars (public controller)
const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarFromDB();

  if (!result || result.length === 0) {
    return NotFoundResponse(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrived successfully!',
    data: result,
  });
});

//get single car by _id (public controller)
const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarFromDB(id);

  if (!result) {
    return NotFoundResponse(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car retrieved successfully!',
    data: result,
  });
});

//Update a car (admin controller )
const updateACar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await CarServices.updateACarFromDB(id, updatedData);

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

// Return a car (admin controller)
const returnACar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;

  const result = await CarServices.returnTheCarFromUser(bookingId, endTime);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car returned successfully',
    data: result,
  });
});

export const CarControllers = {
  craeteCar,
  getAllCars,
  getSingleCar,
  updateACar,
  deleteACar,
  returnACar,
};
