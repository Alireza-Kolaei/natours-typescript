import { Router } from 'express';
// import AuthMiddleware from '../../middlewares/auth.middleware';
// const authMiddleware = new AuthMiddleware();
import TourController from './tour.controller';
const tourController = new TourController();

const tourRouter = Router();

// tourRouter
//   .route('/top-5-cheap')
//   .get(tourController.aliasTopTours, tourController.getAllTours);

// tourRouter.route('/tour-stats').get(tourController.getTourStats);
// tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

// tourRouter
//   .route('/')
//   .get(authController.protect, tourController.getAllTours)
//   .post(tourController.createTour);

// tourRouter
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     tourController.deleteTour
//   );

export default tourRouter;
