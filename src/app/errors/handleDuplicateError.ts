import { TErrorSources, TGenericErrorResponse } from '../utils/interface/error';

//Handles duplicate key errors
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ];

  //status code for the error
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};

// Exporting the handleDuplicateError function
export default handleDuplicateError;
