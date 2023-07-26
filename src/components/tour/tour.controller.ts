/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import Tour from './model/tour.schema';
import MongoRepository from '../../repository/global-mongo.repository';
import catchAsync from '../../utils/catch-async.helper';
import ITour from './model/tour.interface';
import IUser from '../user/model/user.interface';
import User from '../user/model/user.schema';
// import { log } from 'winston';
// import { AuthenticatedRequest } from './model/authenticated-request.interface';

class UsersController {
  private readonly tourRepository: MongoRepository<ITour>;
  private readonly userRepository: MongoRepository<IUser>;
  constructor() {
    this.tourRepository = new MongoRepository(Tour);
    this.userRepository = new MongoRepository(User);
  }
  public getAllTours = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'not implementer',
    });
  });

  public createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const guide = await this.userRepository.findByID(req.body.guides[0]);
    console.log(guide);

    const newTour = await this.tourRepository.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
}

export default UsersController;
