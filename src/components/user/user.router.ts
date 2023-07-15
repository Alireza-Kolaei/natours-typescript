import { Router } from 'express';
// import AuthMiddleware from '../../middlewares/auth.middleware';
// const authMiddleware = new AuthMiddleware();
import UserController from './user.controller';
const userController = new UserController();
import AuthController from '../auth/auth.controller';
const authController = new AuthController();
const userRouter = Router();

// userRouter.post('/signup', authController.signup);
// userRouter.post('/login', authController.login);

// userRouter.post('/forgotPassword', authController.forgotPassword);
// userRouter.patch('/resetPassword/:token', authController.resetPassword);

// userRouter.patch('/updateMyPassword', authController.protect, authController.updatePassword);

// userRouter.patch('/updateMe', authController.protect, userController.updateMe);
// userRouter.delete('/deleteMe', authController.protect, userController.deleteMe);
userRouter.route('/admin').get(authController.protect, userController.adminPanel);

userRouter.route('/').get(userController.getAllUsers).post(userController.createUser);

userRouter.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);
export default userRouter;
