import { Application, Router } from 'express';
import RouteEngine from './router-engine';
import userRouter from '../components/user/user.router';
import authRouter from '../components/auth/auth.router';
import tourRouter from '../components/tour/tour.router';
import reviewRouter from '../components/review/review.router';

class RouteService {
  private app: Application;
  private router: RouteEngine;
  public constructor(app: Application) {
    this.app = app;
    this.router = new RouteEngine();
    this.bindRouters();
  }

  public bindRouters() {
    this.router.registerRouter('/api/v1/tours/', tourRouter);
    this.router.registerRouter('/api/v1/users/', userRouter);
    this.router.registerRouter('/api/v1/auth/', authRouter);
    this.router.registerRouter('/api/v1/review/', reviewRouter);
  }

  public run() {
    this.router.getRouters().forEach((router: Router, routeName: string) => {
      this.app.use(routeName, router);
    });
  }
}

export default RouteService;
