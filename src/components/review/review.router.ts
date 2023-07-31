import { Router } from 'express';

import AuthController from '../auth/auth.controller';
import ReviewController from './review.controller';
const reviewController = new ReviewController();
const authController = new AuthController();

const reviewRouter = Router({ mergeParams: true });

reviewRouter
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect, authController.restrictTo('user'), reviewController.createReview);
export default reviewRouter;
