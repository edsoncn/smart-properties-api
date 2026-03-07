const redis = require('redis')
const constants = require('../helpers/constants')


const client = constants.REDIS_CLUSTER ? 
        redis.createCluster({
            rootNodes: [
                {
                    url: `redis://${constants.REDIS_HOST}:${constants.REDIS_PORT}`
                }
            ],
            defaults: {
                password: constants.REDIS_PASSWORD
            }
        }) : 
        redis.createClient({ 
            url: `redis://${constants.REDIS_HOST}:${constants.REDIS_PORT}`,
            password: constants.REDIS_PASSWORD
        })

module.exports = {
    client
}