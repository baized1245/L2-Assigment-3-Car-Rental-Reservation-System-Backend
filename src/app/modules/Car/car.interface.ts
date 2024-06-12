export type TCar = {
  _id?: string
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: 'available' | 'unavailable';
  isDeleted: boolean;
  createdAt?: Date
  updatedAt?: Date
};
