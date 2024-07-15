const nodemailer = require("nodemailer");
const { ServerConfig}=require("../../config")


const mailSender = nodemailer.createTransport({
 
  service: 'gmail',
  auth: {
    user:  ServerConfig.GMAIL_USER,
    pass:  ServerConfig.GMAIl_PASS
  },
  
});

module.exports=mailSender;