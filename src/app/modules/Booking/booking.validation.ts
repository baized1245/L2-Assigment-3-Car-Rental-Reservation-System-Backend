import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    carId: z.string(),
    startTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        'Invalid start time format, expected HH:MM',
      ),
  }),
});

const returnCarValidationSchema = z.object({
  body: z.object({
    bookingId: z.string().nonempty('Booking ID is required'),
    endTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        'Invalid end time format, expected HH:MM',
      ),
  }),
});

export const bookingValidation = {
  createBookingValidationSchema,
  returnCarValidationSchema,
};
