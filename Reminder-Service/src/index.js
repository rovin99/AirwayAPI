const express = require('express');
const  {ServerConfig}  = require('./config');
const amqplib = require("amqplib");
const { emailService } = require('./services')
const apiRoutes = require('./routes');

const cors = require("cors");
const app = express();

async function connectQueue() {
    try {
      const connection = await amqplib.connect("amqp://localhost");
      console.log("connected to queue");
      const channel = await connection.createChannel();
      channel.consume("NOTIFICATION_QUEUE", async (data) => {
        console.log(`${Buffer.from(data.content)}`);
        const object = JSON.parse(`${Buffer.from(data.content)}`);
       
        await emailService.sendEmail(ServerConfig.GMAIL_USER, object.recepientEmail, object.subject, object.text);
        console.log("Email sent");
        channel.ack(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

    await connectQueue();

});
