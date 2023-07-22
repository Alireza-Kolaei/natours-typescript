import * as nodemailer from 'nodemailer';

export default class EmailService {
  sendEmail = async (receiver: string, subject: string, message: string) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'Natours',
      to: receiver,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
  };
}
