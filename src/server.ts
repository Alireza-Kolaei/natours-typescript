import App from './app';
import mongoose from 'mongoose';
import config from './config/env';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });
let application: App;
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log('MongoDB Connected');
  application = new App(process.env.PORT);
  application.start();
});

const exitHandler = () => {
  if (application) {
    application.close();
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.log(error);
  exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
