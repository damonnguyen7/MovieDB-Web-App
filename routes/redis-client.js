const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log("Error " + err);
  throw err;
});

module.exports = redisClient;
