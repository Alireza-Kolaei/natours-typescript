/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import Tour from './model/tour.schema';
import MongoRepository from '../../repository/global-mongo.repository';
import catchAsync from '../../utils/catch-async.helper';
import ITour from './model/tour.interface';
// import { log } from 'winston';
// import { AuthenticatedRequest } from './model/authenticated-request.interface';

class UsersController {
  private readonly tourRepository: MongoRepository<ITour>;
  constructor() {
    this.tourRepository = new MongoRepository(Tour);
  }
}

export default UsersController;
