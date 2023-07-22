import { Router } from 'express';
import AuthController from './auth.controller';

const authController = new AuthController();
const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/forgotpassword', authController.forgotPassword);
authRouter.patch('/resetpassword/:token', authController.resetPassword);
authRouter.patch('/updateMyPassword', authController.protect, authController.updatePassword);

export default authRouter;
