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

export default class AuthController {
  private readonly userRepository: MongoRepository<IUser>;
  constructor() {
    this.userRepository = new MongoRepository(User);
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
    const correct = user?.correctPassword(password as string, user.password);

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
}
