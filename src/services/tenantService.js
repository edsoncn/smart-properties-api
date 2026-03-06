const redisBaseService = require('./redisBaseService');

const tableName = 'tenant';

const getAll = () => {
    return redisBaseService.getAll(buildAllKey());
}

const save = (tenant) => {
    return redisBaseService.save(buildKey(tenant), tenant);
}

const upsert = (tenant) => {
    return redisBaseService.upsert(buildKey(tenant), tenant);
}

const update = (tenant) => {
    return redisBaseService.update(buildKey(tenant), tenant);
}

const getByIdentifier = (identifier) => {
    return redisBaseService.getByKey(buildKey(identifier));
}

const deleteByIdentifier = (identifier) => {
    return redisBaseService.deleteByKey(buildKey(identifier));
}

const buildKey = (tenantOrIdentifier) => {
    let identifier = tenantOrIdentifier;

    if(typeof tenantOrIdentifier === 'object'){
        identifier = tenantOrIdentifier.identifier;
    }
    return redisBaseService.buildKey([tableName, identifier])
}

const buildAllKey = () => {
    return redisBaseService.buildKey([tableName, '*'])
}

module.exports = {
    getAll,
    save,
    upsert,
    update,
    getByIdentifier,
    deleteByIdentifier
}