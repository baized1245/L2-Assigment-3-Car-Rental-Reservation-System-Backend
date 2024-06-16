// Define an array of error sources with specific fields
export type TErrorSources = {
  path: string | number;
  message: string;
}[];

// Define a generic error response structure
export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
