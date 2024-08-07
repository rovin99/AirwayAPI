const express= require('express');
const {ServerConfig,Logger}=require('./config');
const apiRoutes= require('./routes');
const CRON = require('./utils/common/cron-job');
const { Queue } = require("./config/");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,async()=>{
    
    console.log(`listening on port: ${ServerConfig.PORT}`);
    Logger.info('successfully started',"root",{msg:"something started"});
    await Queue.connectQueue();
})