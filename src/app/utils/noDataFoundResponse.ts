import { Response } from 'express';
import httpStatus from 'http-status';

interface TResponseOptions {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
}

//Sends a  response for "Not Found" as per assigment required
export const noFoundResponse = (res: Response, options: TResponseOptions) => {
  const { success, statusCode, message, data } = options;
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
  });
};

//Sends a response with provided options.
export const NotFoundResponse = (res: Response) => {
  noFoundResponse(res, {
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'No Data Found',
    data: [],
  });
};
