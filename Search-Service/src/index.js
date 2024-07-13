const express= require('express');
const {ServerConfig,Logger}=require('./config');
const apiRoutes= require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT,async()=>{
    console.log(`listening on port: ${ServerConfig.PORT}`);
    Logger.info('successfully started',"root",{msg:"something started"});

    const { flights, Airplane } = require('./models');

    try{
        //new airplane added
        await Airplane.create({
           modelNumber: "A-380",
              capacity: 1000,
        });

        //get all airplane

        const airplanes = await Airplane.findAll();
        console.log(airplanes);

    }
    catch(error){
        Logger.error('error in creating tables',"root",{msg:error.message});
    }


    
});