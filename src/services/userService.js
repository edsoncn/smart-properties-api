const redisBaseService = require('./redisBaseService');
const { Base64 } = require('js-base64');
const bcrypt = require("bcryptjs")

const tableName = 'user';

const getAll = (tenant) => {
    return redisBaseService.getAll(buildAllKey(tenant));
}

const save = (tenant, user) => {
    return redisBaseService.save(buildKey(tenant, user), user);
}

const upsert = (tenant, user) => {
    return redisBaseService.upsert(buildKey(tenant, user), user);
}

const update = (tenant, user) => {
    return redisBaseService.update(buildKey(tenant, user), user);
}

const getByIdentifier = (tenant, identifier) => {
    return redisBaseService.getByKey(buildKey(tenant, identifier));
}

const deleteByIdentifier = (tenant, identifier) => {
    return redisBaseService.deleteByKey(buildKey(tenant, identifier));
}

const buildKey = (tenant, userOrIdentifier) => {
    let identifier = userOrIdentifier;

    if(typeof userOrIdentifier === 'object'){
        let user = userOrIdentifier;

        identifier = Base64.encode(user.email);
        user['identifier'] = identifier;
        if(user.password){
            user['password'] = bcrypt.hashSync(user.password, 8);
        }
    }
    return redisBaseService.buildKey([tableName, tenant, identifier]);
}

const buildAllKey = (tenant) => {
    return redisBaseService.buildKey([tableName, tenant, '*'])
}

module.exports = {
    getAll,
    save,
    upsert,
    update,
    getByIdentifier,
    deleteByIdentifier
}