import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    user: z.string(),
    car: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    totalCost: z.number(),
  }),
});

export const bookingValidation = {
  createBookingValidationSchema,
};
