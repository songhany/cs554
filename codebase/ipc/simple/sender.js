const redisConnection = require('./redis-connection');

redisConnection.emit('send-message', {
  message: 'Hello, world!'
});

setTimeout(() => {
  console.log('Timeout!!!');
  redisConnection.quit();
}, 2500);
