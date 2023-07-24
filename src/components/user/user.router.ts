import { Router } from 'express';
import UserController from './user.controller';
const userController = new UserController();
import AuthController from '../auth/auth.controller';
const authController = new AuthController();
const userRouter = Router();

// userRouter.route('/').get(userController.getAllUsers).post(userController.createUser);
// userRouter.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

userRouter.patch('/updateMe', authController.protect, userController.updateMe);
userRouter.delete('/deleteMe', authController.protect, userController.deleteMe);

export default userRouter;
