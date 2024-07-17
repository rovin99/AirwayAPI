const amqplib = require("amqplib");
async function connectQueue() {
    try {
      connection = await amqplib.connect("amqp://localhost");
      console.log("connected to queue");
      channel = await connection.createChannel();
        await channel.assertQueue("NOTIFICATION_QUEUE");
        channel.consume("NOTIFICATION_QUEUE", async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);
        });
     
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports = { connectQueue};