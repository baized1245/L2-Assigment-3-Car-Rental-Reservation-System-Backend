import mongoose, { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    date: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    startTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    endTime: {
      type: String,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
      default: null,
    },
    totalCost: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

// bookingSchema.statics.isUserExists = async function (email: string) {
//   const existingUser = await Booking.find({ email });
//   return existingUser;
// };

export const Booking = model<TBooking>('Booking', bookingSchema);
