const redisBaseService = require('./redisBaseService');
const utils = require('../helpers/utils')

const tableName = 'smart-property';

const getAll = (tenant, workpace) => {
    return redisBaseService.getAll(buildAllKey(tenant, workpace));
}

const save = (tenant, workpace, smartProperty) => {
    return redisBaseService.save(buildKey(tenant, workpace, smartProperty), smartProperty);
}

const update = (tenant, workpace, smartProperty) => {
    return redisBaseService.update(buildKey(tenant, workpace, smartProperty), smartProperty);
}

const upsertAll = (tenant, workpace, smartProperties) => {
    return redisBaseService.upsertAll(redisBaseService.buildKey([tableName, tenant, workpace]), smartProperties);
}

const getByIdentifier = (tenant, workpace, identifier) => {
    return redisBaseService.getByKey(buildKey(tenant, workpace, identifier));
}

const deleteByIdentifier = (tenant, workpace, identifier) => {
    return redisBaseService.deleteByKey(buildKey(tenant, workpace, identifier));
}

const getAllCodes = (tenant, workpace) => {
    return redisBaseService.getAllWithGetByKeyMethod(buildAllKey(tenant, workpace), getCodeByKey);
}

const getCodeByIdentifier = (tenant, workpace, identifier) => {
    return getCodeByKey(buildKey(tenant, workpace, identifier), true);
}

const getCodeByKey = (key, onlyCode) => {
    return new Promise((resolve, reject) => {
        redisBaseService.getAttributeByKey(key, 'translatedCode')
        .then(result => {
            resolve(onlyCode ? result : {key: removeKeyPrefix(key), code: result})
        })
        .catch((e) => {
            reject(e);
        })
    })
}

const getAllKeys = (tenant, workpace) => {
    return redisBaseService.getKeys(buildAllKey(tenant, workpace))
            .then(keys => Promise.all(
                    keys.map((key => removeKeyPrefix(key)))
            ))
}

const buildKey = (tenant, workpace, smartPropertyOrIdentifier) => {
    let identifier = smartPropertyOrIdentifier;

    if(typeof smartPropertyOrIdentifier === 'object'){
        identifier = smartPropertyOrIdentifier.key;
    }
    return redisBaseService.buildKey([tableName, tenant, workpace, identifier]);
}

const buildAllKey = (tenant, workpace) => {
    return redisBaseService.buildKey([tableName, tenant, workpace, '*'])
}

const removeKeyPrefix = (key) => {
    return key.substring(utils.indexOfCount(key, ':', 3) + 1);
}

module.exports = {
    getAll,
    save,
    update,
    upsertAll,
    getByIdentifier,
    deleteByIdentifier,
    getAllCodes,
    getCodeByIdentifier,
    getAllKeys
}