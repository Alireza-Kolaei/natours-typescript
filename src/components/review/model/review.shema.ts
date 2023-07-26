import { Schema, model } from 'mongoose';
import IReview from './review.interface';

const reviewSchema: Schema = new Schema<IReview>(
  {
    review: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: { type: Date, default: Date.now },
    tour: {
      type: Schema.ObjectId,
      ref: 'Tour',
    },
    user: { type: Schema.ObjectId, ref: 'User' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default model<IReview>('Review', reviewSchema);
