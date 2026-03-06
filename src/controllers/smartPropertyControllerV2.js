const smartPropertyServiceV2 = require('../services/smartPropertyServiceV2');
const exceptions = require('../configs/execeptionsConfig');
const authConfig = require('../configs/authConfig')

const getAll = (req, res) => {
    const tenant = authConfig.getTenant(req);
    const { workspace } = req.params;
    console.log('Get Smart Property All');
    // #swagger.tags = ['Smart Property']
    
    smartPropertyServiceV2.getAll(tenant, workspace)
    .then((smartProperties) => {
        res.status(200).send(smartProperties);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const save = (req, res) => {
    const tenant = authConfig.getTenant(req);
    const { workspace } = req.params;
    console.log('Save Smart Property');
    // #swagger.tags = ['Smart Property']

    let smartProperty = req.body;
    let saveOrUpsertAll = Array.isArray(smartProperty) ? smartPropertyServiceV2.upsertAll : smartPropertyServiceV2.save;

    saveOrUpsertAll(tenant, workspace, smartProperty)
    .then(() => {
        res.status(201).send();
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const update = (req, res) => {
    const tenant = authConfig.getTenant(req);
    const { workspace } = req.params;
    console.log('Update Smart Property');
    // #swagger.tags = ['Smart Property']

    let smartProperty = req.body;

    smartPropertyServiceV2.update(tenant, workspace, smartProperty)
    .then(() => {
        res.status(200).send();
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const getByIdentifier = (req, res) => {
    const tenant = authConfig.getTenant(req);
    const { workspace } = req.params;
    console.log('Get Smart Property by Identifier');
    // #swagger.tags = ['Smart Property']

    const { identifier } = req.params;

    smartPropertyServiceV2.getByIdentifier(tenant, workspace, identifier)
    .then((tenant) => {
        res.status(200).send(tenant);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const deleteByIdentifier = (req, res) => {
    const tenant = authConfig.getTenant(req);
    const { workspace } = req.params;
    console.log('Delete Smart Property by Identifier');
    // #swagger.tags = ['Smart Property']
    
    const { identifier } = req.params;

    smartPropertyServiceV2.deleteByIdentifier(tenant, workspace, identifier)
    .then(() => {
        res.status(200).send();
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const getAllCodes = (req, res) => {
    const tenant = authConfig.getTenant(req);
    const { workspace } = req.params;
    console.log('Get Smart Property All Codes');
    // #swagger.tags = ['Smart Property']
    
    smartPropertyServiceV2.getAllCodes(tenant, workspace)
    .then((smartProperties) => {
        res.status(200).send(smartProperties);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const getCodeByIdentifier = (req, res) => {
    const tenant = authConfig.getTenant(req);
    const { workspace } = req.params;
    console.log('Get Smart Property Code by Identifier');
    // #swagger.tags = ['Smart Property']

    const { identifier } = req.params;

    smartPropertyServiceV2.getCodeByIdentifier(tenant, workspace, identifier)
    .then((tenant) => {
        res.status(200).send(tenant);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const getAllKeys = (req, res) => {
    const tenant = authConfig.getTenant(req);
    const { workspace } = req.params;
    console.log('Get Smart Property Keys All');
    // #swagger.tags = ['Smart Property']
    
    smartPropertyServiceV2.getAllKeys(tenant, workspace)
    .then((keys) => {
        res.status(200).send(keys);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

module.exports = {
    getAll,
    save,
    update,
    getByIdentifier,
    deleteByIdentifier,
    getAllCodes,
    getCodeByIdentifier,
    getAllKeys
}