import { NextFunction, Request, RequestHandler, Response } from 'express';

// Converts an asynchronous route handler into a catch-all error handler for async functions.
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

// Exporting the catchAsync function
export default catchAsync;
