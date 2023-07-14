import { Request, Response } from 'express';
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

  public signup = catchAsync(async (req: Request, res: Response) => {
    const newUser = await this.userRepository.create({ name: req.body.name, email: req.body.email, password: req.body.password });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.send({
      status: 'succsess',
      token,
      data: {
        user: newUser,
      },
    });
  });

  public login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
  });
  public logout = catchAsync(async (req: Request, res: Response) => {});
}
