import { Request, Response } from 'express';
import * as httpStatus from 'http-status';
import ApiError from '../../utils/api-error.helper';
import catchAsync from '../../utils/catch-async.helper';
import IUser from '../user/model/user.interface';
import MongoRepository from '../../repository/global-mongo.repository';
import User from '../user/model/user.schema';
export default class AuthController {
  private readonly userRepository: MongoRepository<IUser>;
  constructor() {
    this.userRepository = new MongoRepository(User);
  }

  public signup = catchAsync(async (req: Request, res: Response) => {
    const newUser = await this.userRepository.create({ name: req.body.name, email: req.body.email, password: req.body.password });

    res.send({
      status: 'succsess',
      data: {
        newUser,
      },
    });
  });

  public login = catchAsync(async (req: Request, res: Response) => {});
  public logout = catchAsync(async (req: Request, res: Response) => {});
}
