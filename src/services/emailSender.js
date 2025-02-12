import nodemailer from "nodemailer";

export const transporter = () => {
  return nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT_Email,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
};
