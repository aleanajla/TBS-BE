const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "terminalbookingsystem1@gmail.com",
    pass: "nsql jzzb lghj nbda",
  },
  tls: { rejectUnauthorized: false },
});