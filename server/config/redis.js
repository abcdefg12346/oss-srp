module.exports = function(injector) {
	const config = require("./env");
	const Promise = require('bluebird');
	const redis = require('redis');
	const lodash = require('lodash');
	const debug = require('debug')('flotto:config:redis');

	Promise.promisifyAll(redis.RedisClient.prototype);
	Promise.promisifyAll(redis.Multi.prototype);

	const redisCfgBuffers = lodash.merge(config.redis, {return_buffers: true});

	const redisClient = redis.createClient(config.redis);
	const redisClientBuffers = redis.createClient(redisCfgBuffers);

	injector.register("redis", redisClient);
	injector.register("redis_buffers", redisClientBuffers);
}