import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../utils/interface/error';

//Handles Mongoose CastError
const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  // status code for the error
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};

// Exporting the handleCastError function
export default handleCastError;
