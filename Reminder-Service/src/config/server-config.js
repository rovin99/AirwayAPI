const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIl_PASS: process.env.GMAIl_PASS,


}