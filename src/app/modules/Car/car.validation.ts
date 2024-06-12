import { z } from 'zod';

// Define the Zod schema for TCar
const carSchemaValidation = z.object({
    body: z.object({
        _id: z.string().optional(),
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        color: z.string().min(1, "Color is required"),
        isElectric: z.boolean(),
        features: z.array(z.string()).nonempty("Features must contain at least one item"),
        pricePerHour: z.number().positive("Price per hour must be a positive number"),
        status: z.enum(['available', 'unavailable']),
        isDeleted: z.boolean(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
    })
});

export const CarValidation = {
    carSchemaValidation
}

