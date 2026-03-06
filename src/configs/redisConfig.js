const redis = require('redis')
const constants = require('../helpers/constants')

const client = redis.createClient({ 
        url: `redis://${constants.REDIS_HOST}:${constants.REDIS_PORT}`,
        password: constants.REDIS_PASSWORD
    })

module.exports = {
    client
}