const workspaceService = require('../services/workspaceService');
const exceptions = require('../configs/execeptionsConfig');
const authConfig = require('../configs/authConfig')

const getAll = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Get Workspace All');
    // #swagger.tags = ['Workspace']
    
    workspaceService.getAll(tenant)
    .then((workspaces) => {
        res.status(200).send(workspaces);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const save = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Save Workspace');
    // #swagger.tags = ['Workspace']

    let workspace = req.body;

    workspaceService.save(tenant, workspace)
    .then(() => {
        res.status(201).send();
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const update = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Update Workspace');
    // #swagger.tags = ['Workspace']

    let workspace = req.body;

    workspaceService.update(tenant, workspace)
    .then(() => {
        res.status(200).send();
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const getByIdentifier = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Get Workspace by Identifier');
    // #swagger.tags = ['Workspace']

    const { identifier } = req.params;

    workspaceService.getByIdentifier(tenant, identifier)
    .then((tenant) => {
        res.status(200).send(tenant);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const deleteByIdentifier = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Delete Workspace by Identifier');
    // #swagger.tags = ['Workspace']
    
    const { identifier } = req.params;

    workspaceService.deleteByIdentifier(tenant, identifier)
    .then(() => {
        res.status(200).send();
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const createApiToken = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Create Api Token for Workspace by Identifier');
    // #swagger.tags = ['Workspace']
    
    const { identifier } = req.params;

    workspaceService.createApiToken(tenant, identifier)
    .then((apiToken) => {
        res.status(201).send({ token : apiToken });
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
    createApiToken
}