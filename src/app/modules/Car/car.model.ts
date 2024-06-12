import { Schema, model } from 'mongoose';
import { TCar } from './car.interface';

// Define the Mongoose schema based on the TCar type
const carSchema: Schema = new Schema<TCar>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    status: {
      type: String,
      required: true,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

// Create the Mongoose model
export const Car = model<TCar>('Car', carSchema);
