import { promisify } from 'util';
import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status';
import ApiError from '../../utils/api-error.helper';
import catchAsync from '../../utils/catch-async.helper';
import IUser from '../user/model/user.interface';
import MongoRepository from '../../repository/global-mongo.repository';
import User from '../user/model/user.schema';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { AuthenticatedRequest } from './model/authenticated-request.interface';
import UserRoles from '../user/model/user-roles.enum';
import EmailService from '../../services/email.service';
import * as crypto from 'crypto';

export default class AuthController {
  private readonly userRepository: MongoRepository<IUser>;
  private readonly emailService: EmailService;
  constructor() {
    this.userRepository = new MongoRepository(User);
    this.emailService = new EmailService();
  }

  private signToken = (id: string) => {
    return jwt.sign(
      {
        sub: id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  };

  public protect = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'You are not logged in'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Token is not valid');
    }

    const currentUser = await this.userRepository.findByID(decoded.sub as string);

    if (!currentUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'The user belonging to this token does no longer exist.');
    }
    //   @ts-ignore
    if (currentUser!.changedPasswordAfter(decoded.iat)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User recently changed password! Please log in again.');
    }

    req.user = currentUser;
    next();
  });

  public restrictTo = (...roles: any) => {
    return (req: Request | any, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.role)) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED ACCESS'));
      }
      next();
    };
  };

  public signup = catchAsync(async (req: Request, res: Response) => {
    const newUser = await this.userRepository.create({ name: req.body.name, email: req.body.email, password: req.body.password });
    const token = this.signToken(newUser.id);
    res.status(httpStatus.OK).json({
      status: 'succsess',
      token,
      data: {
        user: newUser,
      },
    });
  });

  public login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'No email or password provided!'));
    }

    const user = await this.userRepository.findOneByParams({ email }, '+password');
    const correct = await user?.correctPassword(password as string, user.password);
    console.log(correct);

    if (!user || !correct) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password'));
    }

    const token = this.signToken(user.id);
    res.status(httpStatus.OK).json({
      status: 'succsess',
      token,
    });
  });

  public logout = catchAsync(async (req: Request, res: Response) => {});

  public forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.userRepository.findOneByParams({ email: req.body.email });
    if (!user) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'No user found'));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    try {
      await this.emailService.sendEmail(user.email, 'Password reset link', `This is your password reset link ${resetUrl}`);
      res.send({
        status: 'success',
        message: 'Token sent to email',
      });
    } catch (error) {
      console.log(error);

      user.passwordResetToken = undefined;
      user.passwordResetToken = undefined;
      user.save({ validateBeforeSave: false });
      return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error while sendig email , please try again later'));
    }
  });

  public resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await this.userRepository.findOneByParams({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() } as unknown as Date,
    });

    if (!user) {
      return next(new ApiError(400, 'token is invalid or expired'));
    }
    user.password = req.body.password;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    const token = this.signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  });

  public updatePassword = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const user = await this.userRepository.findByID(req.user.id, '+password');

    const correct = await user!.correctPassword(req.body.Currentpassword, user!.password);

    if (!correct) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'password is not correct'));
    }

    user!.password = req.body.newPassword;
    await user!.save();

    const token = this.signToken(user!._id);
    res.status(200).json({
      status: 'success',
      token,
      message: 'Password changed',
    });
  });
}
