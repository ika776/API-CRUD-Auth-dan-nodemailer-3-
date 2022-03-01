const nodemailer = require("nodemailer");

async function sendEmail(email, username, token) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });
  let mailOption = {
    from: '"KW " <no-reply@example.com>', // sender address
    to: email, // list of receivers
    subject: "Email Verification", // Subject line
    html: `<center> <h2> Welcome ${username}! <br> Thanks for registering on our site</h2>
    <h4>Please verify your email addres to continue login...</h4>
    <a href= "http://localhost:3000/verify?token=${token}">Verify your email</a></center>`, // html body, // html body
  };
  transporter.sendMail(mailOption, (err, res) => {
    if (err) console.log(err);
    else console.log("Email berhasil terkirim");
  });
}

module.exports = {
  sendEmail,
};