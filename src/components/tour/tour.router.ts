import { Router } from 'express';
// import AuthMiddleware from '../../middlewares/auth.middleware';
// const authMiddleware = new AuthMiddleware();
import TourController from './tour.controller';
const tourController = new TourController();

const userRouter = Router();

// userRouter.post('/signup', authController.signup);
// userRouter.post('/login', authController.login);

// userRouter.post('/forgotPassword', authController.forgotPassword);
// userRouter.patch('/resetPassword/:token', authController.resetPassword);

// userRouter.patch('/updateMyPassword', authController.protect, authController.updatePassword);

// userRouter.patch('/updateMe', authController.protect, userController.updateMe);
// userRouter.delete('/deleteMe', authController.protect, userController.deleteMe);

userRouter.route('/').get(userController.getAllUsers).post(userController.createUser);

userRouter.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

export default userRouter;