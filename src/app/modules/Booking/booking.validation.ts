import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format, expected YYYY-MM-DD'),
    user: z.string().optional(),
    carId: z.string().optional(),
    startTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        'Invalid start time format, expected HH:MM',
      ),
    endTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        'Invalid end time format, expected HH:MM',
      )
      .optional(),
    totalCost: z.number().default(0).optional(),
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
