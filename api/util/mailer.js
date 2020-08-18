const nodemailer = require("nodemailer");

exports.sendEmail = async (from, to,subject, body) => {

  const { HOST, PORT, AUTH_USER, AUTH_PASS } = process.env;
  let transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: false,
    auth: {
      user: AUTH_USER,
      pass: AUTH_PASS,
    },
  });

    let info = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
