import { Schema } from 'mongoose';

export type TBooking = {
  date: string;
  user?: Schema.Types.ObjectId;
  car: Schema.Types.ObjectId;
  startTime: string;
  endTime?: string;
  totalCost: number;
};
