import { z } from 'zod';

const signupUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.union([z.literal('user'), z.literal('admin')]),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    createdAt: z.optional(z.date()),
    updatedAt: z.optional(z.date()),
  }),
});

export const SignupUserValidation = {
  signupUserValidationSchema,
};
