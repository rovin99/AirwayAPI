const express = require('express');
const  {ServerConfig}  = require('./config');
const apiRoutes = require('./routes');
const cors = require("cors");
const app = express();

const mailSender=require("./utils/common/email-service")
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', apiRoutes);



app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

    try{

        const response=await mailSender.sendMail({
            from: ServerConfig.GMAIL_USER,
            to: "rs206987@gmail.com",
            subject: "Test",
            text: "Test"


        })
        console.log(response);

    }catch(error){
        console.log("Error in sending ",error);

    }

});
