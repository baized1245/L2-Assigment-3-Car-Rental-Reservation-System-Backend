import { Model, Schema, Types } from 'mongoose';

export type TBooking = {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime?: string | null;
  totalCost: number;
};

export interface CreateBookingData {
  carId: string;
  date: string;
  startTime: string;
  userId: string;
}

export interface BookingModel extends Model<TBooking> {
  isUserExists(email: string): Promise<TBooking | null>;
}
