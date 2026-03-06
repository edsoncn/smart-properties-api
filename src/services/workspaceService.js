const redisBaseService = require('./redisBaseService');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');

const tableName = 'workspace';

const getAll = (tenant) => {
    return redisBaseService.getAll(buildAllKey(tenant), filter);
}

const save = (tenant, workspace) => {
    return redisBaseService.save(buildKey(tenant, workspace), workspace);
}

const update = (tenant, workspace) => {
    return redisBaseService.update(buildKey(tenant, workspace), workspace);
}

const getByIdentifier = (tenant, identifier) => {
    return redisBaseService.getByKey(buildKey(tenant, identifier), filter);
}

const getToken = (tenant, identifier) => {
    return redisBaseService.getAttributeByKey(buildKey(tenant, identifier), 'token');
}

const deleteByIdentifier = (tenant, identifier) => {
    return redisBaseService.deleteByKey(buildKey(tenant, identifier));
}

const createApiToken = (tenant, identifier) => {
    let uuidEncrypted = md5(uuidv4());
    let key = buildKey(tenant, identifier);

    return new Promise((resolve, reject) => {
        redisBaseService.update(key, { token : uuidEncrypted })
        .then(() => {
            let apiKey = md5(buildKey(key, uuidEncrypted));
            resolve(apiKey);
        })
        .catch((e) => {
            reject(e);
        });
    })
}

const validateApiToken = (tenant, identifier, token, apitoken) => {
    let key = buildKey(tenant, identifier);
    return apitoken === md5(buildKey(key, token));
}

const filter = (workspace) => {
    workspace.hasToken = Object.hasOwnProperty.bind(workspace)('token');
    if(workspace.hasToken) delete workspace['token'];
}

const buildKey = (tenant, workspaceOrIdentifier) => {
    let identifier = workspaceOrIdentifier;

    if(typeof workspaceOrIdentifier === 'object'){
        identifier = workspaceOrIdentifier.identifier;
    }
    return redisBaseService.buildKey([tableName, tenant, identifier])
}

const buildAllKey = (tenant) => {
    return redisBaseService.buildKey([tableName, tenant, '*'])
}

module.exports = {
    getAll,
    save,
    update,
    getByIdentifier,
    getToken,
    deleteByIdentifier,
    createApiToken,
    validateApiToken
}