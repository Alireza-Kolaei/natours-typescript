/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import ApiError from '../../utils/api-error.helper';
import User from './model/user.schema';
import MongoRepository from '../../repository/global-mongo.repository';
import IUser from './model/user.interface';
import catchAsync from '../../utils/catch-async.helper';
import { BAD_REQUEST } from 'http-status';
// import { log } from 'winston';
// import { AuthenticatedRequest } from './model/authenticated-request.interface';

class UsersController {
  private readonly userRepository: MongoRepository<IUser>;
  constructor() {
    this.userRepository = new MongoRepository(User);
  }
  private filterObj = (obj: Partial<IUser>, ...allowedFields: string[]) => {
    const newObj: Partial<IUser> = {};
    Object.keys(obj).forEach((el) => {
      // @ts-ignore
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };

  public updateMe = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    if (req.body.password) {
      return next(new ApiError(BAD_REQUEST, 'This route in not for password updates.'));
    }

    const filteredBody = this.filterObj(req.body, 'name', 'email');
    console.log(filteredBody);

    const updatedUser = await this.userRepository.updateById(req.user.id, filteredBody);

    res.status(200).json({
      status: 'success',
      message: 'User updated',
      data: {
        user: updatedUser,
      },
    });
  });

  public deleteMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

  public adminPanel = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Admin Panel',
    });
  });

  public createUser = catchAsync(async (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  });

  public getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await this.userRepository.findMany({});

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  });

  public create = catchAsync(async (req: Request, res: Response) => {
    const newUser = this.userRepository.create(req.body);

    res.status(500).json({
      status: 'error',
      message: newUser,
    });
  });

  public getUser = catchAsync(async (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  });

  public updateUser = catchAsync(async (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  });

  public deleteUser = catchAsync(async (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  });

  //   public create = catchAsync(async (req: Request, res: Response) => {
  //     const newUser = await this.userRepository.create(req.body);
  //     res.send(newUser);
  //   });

  //   public admin = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  //     console.log(req.user);

  //     res.send('Admin panel');
  //   });
}

export default UsersController;
