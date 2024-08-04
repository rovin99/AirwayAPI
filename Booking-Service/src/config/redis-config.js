const redis = require("redis");


const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});


(async () => {
  await redisClient.connect();
  console.log("Redis Connected");
})();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

module.exports = redisClient;