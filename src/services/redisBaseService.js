const redisConfig = require('../configs/redisConfig');
const exceptions = require('../configs/execeptionsConfig');

const booleanFieds = {
    "new" : true
}

const getAll = (searchTerm, filter) => {    
    return getAllWithGetByKeyMethod(searchTerm, getByKey, filter);
}

const save = async (key, data) => {  
    try {  
        let client = redisConfig.client
        console.log('save > key: ' + key);
        
        if (!client.isOpen) await client.connect();
        
        const exists = await existsKey(key)

        if (!exists) {
            await upsert(key, data)
        } else {
            throw exceptions.duplicateError
        }
    } catch (error) {
        console.error("save error: ", error);
        throw error;
    }
}

const update = async (key, data) => {  
    try {  
        let client = redisConfig.client
        console.log('update > key: ' + key);
        
        if (!client.isOpen) await client.connect();
        
        const exists = await existsKey(key)

        if (exists) {
            await upsert(key, data)
        } else {
            throw exceptions.notFoundError
        }
    } catch (error) {
        console.error("update error: ", error);
        throw error;
    }
}

const upsert = async (key, data) => {  
    try {
        let client = redisConfig.client
        console.log('upsert > key: ' + key);
        
        if (!client.isOpen) await client.connect();
        
        const pipeline = client.multi();
        for (const k in data) {
            let val = data[k];

            if (booleanFieds[k]) {
                val = val.toString();
            }

            pipeline.hSet(key, k, val);
        }
        await pipeline.exec();

    } catch (error) {
        console.error("upsert error: ", error);
        throw error;
    }
}

const upsertAll = async (keyPrefix, datas) => {
    try {
        let client = redisConfig.client
        console.log('upsert all > keyPrefix: ' + keyPrefix);
        
        if (!client.isOpen) await client.connect();
        
        const pipeline = client.multi();

        datas.forEach( (data) => {
            let key = [keyPrefix, data.key].join(':');

            console.log(' - key: ' + key);
            for(let k in data){
                let val = data[k];

                if (booleanFieds[k]) {
                    val = val.toString();
                }

                pipeline.hSet(key, k, val);
            }
        });

        await pipeline.exec();

    } catch (error) {
        console.error("upsert all error: ", error);
        throw error;
    }
}

const getByKey = async (key, filter) => {
    try {
        let client = redisConfig.client
        console.log('get > key: ' + key);
        
        if (!client.isOpen) await client.connect();
        
        const data = await client.hGetAll(key);

        if (data && Object.keys(data).length > 0) {
            for (let b in booleanFieds) {
                if (b in data) {
                    data[b] = data[b] === 'true'
                }
            }
            if (filter) filter(data)
            return data;
        } else {
            throw exceptions.notFoundError
        }
    } catch (error) {
        console.error("get by key error: ", error);
        throw error;
    }
}

const getAttributeByKey = async (key, attribute) => {
    try {
        let client = redisConfig.client
        console.log('get attribute > key: ' + key)
        
        if (!client.isOpen) await client.connect()

        let result = await client.hGet(key, attribute)
        
        if (booleanFieds[attribute]) {
            result = result === 'true'
        }

        if (!result) throw exceptions.notFoundError

        return result;
    } catch (error) {
        console.error("get attribute by key error: ", error);
        throw error;
    }
}

const deleteByKey = async (key) => {
    try {
        let client = redisConfig.client
        console.log('delete> key: ' + key)
        
        if (!client.isOpen) await client.connect()

        const result = await client.del(key)
        
        if(result !== 1) throw exceptions.notFoundError

    } catch (error) {
        console.error("delete by key error: ", error);
        throw error;
    }
}

const existsKey = async (key) => {
    try {
        let client = redisConfig.client
        console.log('exists > key: ' + key);
        
        if (!client.isOpen) await client.connect();
        
        const reply = await client.exists(key)
        
        return reply === 1;
    } catch (error) {
        console.error("exists key error: ", error);
        throw error;
    }
}

const getKeys = async (searchTerm) => {    
    try {
        let client = redisConfig.client
        console.log('get keys > searchTerm: ' + searchTerm);
        
        if (!client.isOpen) await client.connect();

        return client.keys(searchTerm)

    } catch (error) {
        console.error("get keys error: ", error);
        throw error;
    }
}

const buildKey = (values) => {
    let key = values.join(':');

    console.log(key);
    return key;
}

const getAllWithGetByKeyMethod = (searchTerm, getByKeyMethod, filter) => {      
    return new Promise((resolve, reject) => {
        getKeys(searchTerm)
        .then((keys) => {
            console.log(keys);
            Promise.all(
                keys.map((key) => {
                    console.log(key);
                    return getByKeyMethod(key, filter);
                })
            )
            .then((result) => {
                //console.log(result);
                resolve(result);
            })
            .catch((e) => {
                reject(e);
            })
        })
        .catch((e) => {
            reject(e);
        })
    })
}

module.exports = {
    getAll,
    getAllWithGetByKeyMethod,
    save,
    update,
    upsert,
    upsertAll,
    getByKey,
    getAttributeByKey,
    deleteByKey,
    existsKey,
    getKeys,
    buildKey
}

