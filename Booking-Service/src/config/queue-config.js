const amqplib = require("amqplib");

let channel, connection;

async function connectQueue() {
  try {
    connection = await amqplib.connect("amqp://localhost");
    console.log("connected to queue");
    channel = await connection.createChannel();
    await channel.assertQueue("NOTIFICATION_QUEUE");
    channel.sendToQueue("NOTIFICATION_QUEUE", Buffer.from('one more'));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectQueue};