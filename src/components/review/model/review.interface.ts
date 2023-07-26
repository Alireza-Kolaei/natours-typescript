import { Document, Schema } from 'mongoose';

export default interface IReview extends Document {
  id: string;
  name: string;
  review: string;
  rating: number;
  createdAt: Date;
  tour: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}
