/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import Tour from './model/tour.schema';
import MongoRepository from '../../repository/global-mongo.repository';
import catchAsync from '../../utils/catch-async.helper';
import ITour from './model/tour.interface';
import IUser from '../user/model/user.interface';
import User from '../user/model/user.schema';
import ApiError from '../../utils/api-error.helper';
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
    const allTours = await this.tourRepository.findMany({});
    res.status(200).json({
      status: 'success',
      data: {
        allTours,
      },
    });
  });

  public getTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tour = await this.tourRepository.findByID(req.params.id, undefined, ['guides']);
    if (!tour) {
      return next(new ApiError(404, 'no tour found with that id!'));
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  });
  public updateTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
  public deleteTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

  public createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
