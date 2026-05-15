const nodemailer = require("nodemailer");

module.exports = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use false for port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      // This bypasses the self-signed certificate error
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `Fin Buddy <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
};