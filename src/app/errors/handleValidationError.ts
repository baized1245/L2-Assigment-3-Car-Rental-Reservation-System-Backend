import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../utils/interface/error';

//Handles Mongoose validation errors
const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  //status code for validation errors
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

// Exporting the handleValidationError function
export default handleValidationError;
