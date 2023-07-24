import { Application, urlencoded, json as expressJson } from 'express';
import * as mongoSanitize from 'express-mongo-sanitize';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
const xss = require('xss-clean');

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP',
});

export default function bootstrap(app: Application) {
  app.use(helmet());
  app.use('/api', limiter);
  app.use(cors());
  app.use(urlencoded({ extended: true, limit: '10kb' }));
  app.use(expressJson({ limit: '10kb' }));
  app.use(cookieParser());
  app.use(mongoSanitize());
  app.use(xss());
  app.use(compression());
  app.use(morgan('dev'));
}
