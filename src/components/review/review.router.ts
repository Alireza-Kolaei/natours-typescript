import { Router } from 'express';

import AuthController from '../auth/auth.controller';
import ReviewController from './review.controller';
const reviewController = new ReviewController();
const authController = new AuthController();

const reviewRouter = Router();
reviewRouter.route('/').get(reviewController.getAllReviews).post(reviewController.addReview);
export default reviewRouter;
