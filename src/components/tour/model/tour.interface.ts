import { Document } from 'mongoose';
import TourDifficulty from './tour-difficulty.enum';

export default interface ITour extends Document {
  id: string;
  name: string;
  slug?: string;
  duration: number;
  maxGroupSize: number;
  difficulty: TourDifficulty;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  price: number;
  priceDiscount?: number;
  summary: string;
  description?: string;
  imageCover: string;
  images?: string[];
  createdAt: Date;
  startDates?: Date[];
  secretTour: boolean;
  startLocation: { type: String; coordinates: number[]; address: string; description: string };
  locations: { type: String; coordinates: number[]; address: string; description: string; day: number }[];
  guides: Array<string>;
}
