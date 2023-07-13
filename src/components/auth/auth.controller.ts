import { Request, Response } from 'express';
import * as httpStatus from 'http-status';
import ApiError from '../../utils/api-error.helper';
import catchAsync from '../../utils/catch-async.helper';
import IUser from '../user/model/user.interface';

export default class AuthController {
  constructor() {}

  public signup = catchAsync(async (req: Request, res: Response) => {});
  public login = catchAsync(async (req: Request, res: Response) => {});
  public logout = catchAsync(async (req: Request, res: Response) => {});
}
