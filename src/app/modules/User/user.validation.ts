import { z } from 'zod';

// Validation schema for SignUp a user / admin
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

// Validation schema for SignIn a user / admin
const sigInUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const SignupUserValidation = {
  signupUserValidationSchema,
  sigInUserValidationSchema,
};
