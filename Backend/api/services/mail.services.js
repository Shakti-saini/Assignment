const transporter = require("../../config/mailer");

exports.sendMailService = async (data, files) => {
  const attachments = files?.map((file) => ({
    filename: file.originalname,
    path: file.path,
  }));

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.to,
    cc: data.cc,
    bcc: data.bcc,
    subject: data.subject,
    html: data.body,
    attachments,
  };

  return await transporter.sendMail(mailOptions);
};