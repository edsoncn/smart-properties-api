const redisConfig = require('../configs/redisConfig')

const getKeysBySearchTerm = (searchTerm) => {    
    return new Promise((resolve, reject) => {    
        let client = redisConfig.client();
         
        client.on('connect', function() {
            client.keys(searchTerm, function (err, keys) {
                console.log('Keys: ');
                console.log(keys);
                resolve(keys);
            });    
        });        
        client.on('error', (error) => {
            console.error(error);
            client.quit();
            reject();
        });
    })
}

const getByKey = (key, client) => {    
    if(!client) client = redisConfig.client();
    
    return new Promise((resolve, reject) => {    
        client.on('connect', function() {    
            console.log(' - key: ' + key);    
            client.hgetall(key, function(err, reply) {
                resolve(reply);
            });
        });
        client.on('error', (error) => {
            console.error(error);
            client.quit();
            reject();
        });
    })
}

const getByKeys = (keys, client) => {
    return Promise.all(
        keys.map((key) => {            
            if(!client) client = redisConfig.client();
            return getByKey(key, client)
        })
    )
}

const save = (props) => {
    return new Promise((resolve, reject) => { 
        let client = redisConfig.client();
    
        client.on('connect', function() {
            props.forEach( (prop) => {
                let key = prop.key;
    
                console.log(' - key: ' + key);
                for(let k in prop){
                    if(k !== key){
                        client.hset(key, k, prop[k]);
                    }
                }
            });    
            resolve();
        });
        client.on('error', (error) => {
            console.error(error);
            client.quit();
            reject();
        });        
    })
}

const deleteByKey = (key) => {
    let client = redisConfig.client();
    
    return new Promise((resolve, reject) => {
        client.on('connect', function() {
            console.log(' - key: ' + key);    
            client.del(key);
            resolve();
        });        
        client.on('error', (error) => {
            console.error(error);
            client.quit();
            reject();
        });
    })
}

const getCodeByKey = (key, client, showKey) => {    
    if(!client) client = redisConfig.client();
        
    return new Promise((resolve, reject) => {        
        client.on('connect', function() {        
            console.log(' - key: ' + key);
            client.hget(key, ['translatedCode'], function(err, reply) {
                resolve(showKey ? { key : key, translatedCode : reply} : reply);
            });
        });
        client.on('error', (error) => {
            console.error(error);
            client.quit();
            reject();
        });
    })
}

const getCodesByKeys = (keys, client) => {
    return Promise.all(
        keys.map((key) => {
            if(!client) client = redisConfig.client();
            return getCodeByKey(key, client, true)
        })
    )
}

module.exports = {
    getKeysBySearchTerm,
    getByKey,
    getByKeys,
    save,
    deleteByKey,
    getCodeByKey,
    getCodesByKeys
}

