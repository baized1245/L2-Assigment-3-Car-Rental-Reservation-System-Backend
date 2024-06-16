import mongoose, { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';
import { Car } from '../Car/car.model';

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

// Pre-save hook to calculate the total cost
bookingSchema.pre('save', async function (next) {
  if (
    this.isModified('startTime') ||
    this.isModified('endTime') ||
    this.isModified('car')
  ) {
    const car = await Car.findById(this.car);
    if (car) {
      const start = new Date(`1970-01-01T${this.startTime}:00Z`).getTime();
      const end = new Date(`1970-01-01T${this.endTime}:00Z`).getTime();
      const durationInHours = (end - start) / (1000 * 60 * 60);
      this.totalCost = durationInHours * car.pricePerHour;
    }
  }
  next();
});

bookingSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Booking.find({ email });
  return existingUser;
};

export const Booking = model<TBooking>('Booking', bookingSchema);
