const express=require('express');

const v1Routes=require('./v1');
//const v2Routes=require('./v2');
const router = express.Router();
console.log("received")
router.use('/v1',v1Routes); //if url contains /v1- then use this apis
//router.use('/v2',v2Routes);
module.exports =router;
