const port = 6379
var redis = require('redis');
var client = redis.createClient(port, 'localhost', {no_ready_check: true});
client.on('connect', function() {
    console.log('Connected to Redis');
});

module.exports = {
    set : (key, value) => client.set(key, value, redis.print),
    get : (key, cb) => client.get(key, cb)
}
