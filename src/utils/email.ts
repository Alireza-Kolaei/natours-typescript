import * as nodemailer from 'nodemailer';

export default class EmailService {
  private sendEmail = async () => {
    //   create transporter

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    // define the email options
    const mailOp;
    // send email
  };
}
