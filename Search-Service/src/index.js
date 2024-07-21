const express= require('express');
const {ServerConfig,Logger}=require('./config');
const apiRoutes= require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api',apiRoutes);
app.use('/flightService/api',apiRoutes);
app.listen(ServerConfig.PORT,async()=>{
    console.log(`listening on port: ${ServerConfig.PORT}`);
    Logger.info('successfully started',"root",{msg:"something started"});

    
});