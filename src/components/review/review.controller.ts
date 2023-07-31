/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import MongoRepository from '../../repository/global-mongo.repository';
import catchAsync from '../../utils/catch-async.helper';
import ApiError from '../../utils/api-error.helper';
import IUser from '../user/model/user.interface';
import ITour from '../tour/model/tour.interface';
import tourSchema from '../tour/model/tour.schema';
import userSchema from '../user/model/user.schema';
import IReview from './model/review.interface';
import reviewShema from './model/review.shema';

class ReviewController {
  private readonly tourRepository: MongoRepository<ITour>;
  private readonly userRepository: MongoRepository<IUser>;
  private readonly reviewRepository: MongoRepository<IReview>;
  constructor() {
    this.tourRepository = new MongoRepository(tourSchema);
    this.userRepository = new MongoRepository(userSchema);
    this.reviewRepository = new MongoRepository(reviewShema);
  }
  public getAllReviews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

  public createReview = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    const newReview = await this.reviewRepository.create(req.body);

    res.send({});
  });
}

export default ReviewController;
