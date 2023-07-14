import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status';
import ApiError from '../../utils/api-error.helper';
import catchAsync from '../../utils/catch-async.helper';
import IUser from '../user/model/user.interface';
import MongoRepository from '../../repository/global-mongo.repository';
import User from '../user/model/user.schema';
import * as jwt from 'jsonwebtoken';
export default class AuthController {
  private readonly userRepository: MongoRepository<IUser>;
  constructor() {
    this.userRepository = new MongoRepository(User);
  }

  private signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
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
