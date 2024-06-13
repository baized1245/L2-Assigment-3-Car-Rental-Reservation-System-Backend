import mongoose, { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema: Schema = new Schema<TBooking>({
  date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
});

export const Booking = model<TBooking>('Booking', bookingSchema);

// date: { type: String, required: true },
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
//   totalCost: { type: Number, required: true },
