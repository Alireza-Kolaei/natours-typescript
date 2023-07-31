import { Router } from 'express';
import TourController from './tour.controller';
const tourController = new TourController();
import AuthController from '../auth/auth.controller';
const authController = new AuthController();
import reviewRouter from '../review/review.router';

const tourRouter = Router();

// tourRouter
//   .route('/top-5-cheap')
//   .get(tourController.aliasTopTours, tourController.getAllTours);

// tourRouter.route('/tour-stats').get(tourController.getTourStats);
// tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

// tourRouter.route('/:tourId/reviews').post(authController.protect, authController.restrictTo('user'), reviewController.createReview);

tourRouter.use('/:tourId/review', reviewRouter);

tourRouter.route('/').get(tourController.getAllTours).post(tourController.createTour);

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);

export default tourRouter;
