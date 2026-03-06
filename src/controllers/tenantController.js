const tenantService = require('../services/tenantService');
const exceptions = require('../configs/execeptionsConfig');

const getAll = (req, res) => {
    console.log('Get Tenant All');
    // #swagger.tags = ['Tenant']
    
    tenantService.getAll()
    .then((tenats) => {
        res.status(200).send(tenats);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const save = (req, res) => {
    console.log('Save Tenant');
    // #swagger.tags = ['Tenant']

    let tenant = req.body;

    tenantService.save(tenant)
    .then(() => {
        res.status(201).send();
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const update = (req, res) => {
    console.log('Update Tenant');
    // #swagger.tags = ['Tenant']

    let tenant = req.body;

    tenantService.update(tenant)
    .then(() => {
        res.status(200).send();
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const getByIdentifier = (req, res) => {
    console.log('Get Tenant by Identifier');
    // #swagger.tags = ['Tenant']

    const { identifier } = req.params;

    tenantService.getByIdentifier(identifier)
    .then((tenant) => {
        res.status(200).send(tenant);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const deleteByIdentifier = (req, res) => {
    console.log('Delete Tenant by Identifier');
    // #swagger.tags = ['Tenant']
    
    const { identifier } = req.params;

    tenantService.deleteByIdentifier(identifier)
    .then(() => {
        res.status(200).send();
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
    deleteByIdentifier
}