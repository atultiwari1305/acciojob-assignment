const redis = require('redis');

let redisClient;
const redisUrl = process.env.REDIS_URL;

if (redisUrl) {
  redisClient = redis.createClient({ url: redisUrl });

  redisClient.on('error', (err) => {
    console.error('❌ Redis connection error:', err.message);
  });

  redisClient.connect()
    .then(() => {
      console.log('✅ Connected to Redis');
    })
    .catch((err) => {
      console.error('❌ Redis failed to connect:', err.message);
    });
} else {
  console.log('ℹ️ REDIS_URL not set, skipping Redis connection.');
}

module.exports = redisClient;
