// Custom error class extending the built-in Error class
class AppError extends Error {
  public statusCode: number;

  //Constructor for creating an instance of AppError.
  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the AppError class as the default export
export default AppError;
