import * as express from 'express';
import { Application } from 'express';
import RouteService from './router/router.service';
import exceptionHandler from './middlewares/error/error.handler';
import bootstrap from './middlewares/boot.middleware';

class App {
  public app: Application;
  public port: number;
  public router: RouteService;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.router = new RouteService(this.app);
  }

  public start(): void {
    bootstrap(this.app);
    this.router.run();
    exceptionHandler(this.app);
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  }

  public close(): void {
    console.log('server closed');
    process.exit(1);
  }
}

export default App;
