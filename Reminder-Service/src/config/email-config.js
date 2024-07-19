const nodemailer = require("nodemailer");

const { GMAIL_USER, GMAIl_PASS } = require("./server-config");

const mailsender = nodemailer.createTransport({

  service: "Gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIl_PASS,
  },
});

module.exports = mailsender;
