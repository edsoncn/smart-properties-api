const smartPropertiesService = require("../services/smartPropertiesService");

const NOT_FOUND = '"Not found"';
const ADDED = '"Added"';
const SERVER_ERROR = '"Server Error"';
const DELETED = '"Deleted"';

const getAll = (req, res) => {
    console.log('Get Smart Properties All');
    // #swagger.tags = ['Smart Properties']
    // #swagger.deprecated = true

    smartPropertiesService.getKeysBySearchTerm('*')
    .then((keys) => {
        smartPropertiesService.getByKeys(keys)
        .then((result) => {
            if(!res.headerSent) res.status(200).send(result)
        })
        .catch((e) => {
            console.error(e);
            if(!res.headerSent) res.status(500).send(SERVER_ERROR)
        })
    })
    .catch((e) => {
        console.error(e);
        if(!res.headerSent) res.status(500).send(SERVER_ERROR)
    })
}

const save = (req, res) => {
    console.log('Add Smart Properties');
    // #swagger.tags = ['Smart Properties']
    /* #swagger.parameters['smartProperties'] = {
           in: 'body',
           required: true
    } */
    // #swagger.deprecated = true

    let reqProps = Array.isArray(req.body) ? req.body : [req.body];
    
    smartPropertiesService.save(reqProps)
    .then(() => {
        if(!res.headerSent) res.status(201).send(ADDED)
    })
    .catch((e) => {
        console.error(e);
        if(!res.headerSent) res.status(500).send(SERVER_ERROR)
    })
}

const getByKey = (req, res) => {
    console.log('Get Smart Properties By Key');
    // #swagger.tags = ['Smart Properties']
    // #swagger.deprecated = true

    const { key } = req.params;
    
    smartPropertiesService.getByKey(key)
    .then((reply) => {
        if(!res.headerSent) reply ? res.status(200).send(reply) : res.status(404).send(NOT_FOUND)
    })
    .catch((e) => {
        console.error(e);
        if(!res.headerSent) res.status(500).send(SERVER_ERROR)
    })
}

const deleteByKey = (req, res) => {
    console.log('Delete Smart Properties');
    // #swagger.tags = ['Smart Properties']
    // #swagger.deprecated = true

    const { key } = req.params;
    
    smartPropertiesService.deleteByKey(key)
    .then(() => {
        if(!res.headerSent) res.status(200).send(DELETED)
    })
    .catch((e) => {
        console.error(e);
        if(!res.headerSent) res.status(500).send(SERVER_ERROR)
    })
}

const getAllCodes = (req, res) => {
    console.log('Get Smart Properties Code');
    // #swagger.tags = ['Smart Properties Code']
    // #swagger.deprecated = true
    
    smartPropertiesService.getKeysBySearchTerm('*')
    .then((keys) => {
        smartPropertiesService.getCodesByKeys(keys)
        .then((result) => {
            if(!res.headerSent) res.status(200).send(result)
        })
    })
    .catch((e) => {
        console.error(e);
        if(!res.headerSent) res.status(500).send(SERVER_ERROR)
    })
}

const getCodeByKey = (req, res) => {
    console.log('Get Smart Properties Code By Key');
    // #swagger.tags = ['Smart Properties Code']
    // #swagger.deprecated = true
       
    const { key } = req.params;

    smartPropertiesService.getCodeByKey(key)
    .then((reply) => {
        if(!res.headerSent) reply ? res.status(200).send(JSON.parse(reply)) : res.status(404).send(NOT_FOUND)
    })
    .catch((e) => {
        console.error(e);
        if(!res.headerSent) res.status(500).send(SERVER_ERROR)
    })
}

const _searchKeysBySearchTerm = (req, res, searchTerm) => {
    console.log('Get Smart Properties Keys: ' + searchTerm);

    smartPropertiesService.getKeysBySearchTerm(searchTerm)
    .then((keys) => {
        if(!res.headerSent) res.status(200).send(keys)
    })
    .catch((e) => {
        console.error(e);
        if(!res.headerSent) res.status(500).send(SERVER_ERROR)
    })
};

const getAllKeys = (req, res) => {
    // #swagger.tags = ['Smart Properties Keys']
    // #swagger.deprecated = true

    res.status(410).send();
          
    _searchKeysBySearchTerm(req, res, '*');
}

const searchKeys = (req, res) => {
    // #swagger.tags = ['Smart Properties Keys']
    // #swagger.deprecated = true

    const { searchTerm } = req.params;    
    _searchKeysBySearchTerm(req, res, '*' + searchTerm + '*');

}

module.exports = {
    getAll,
    save,
    getByKey,
    deleteByKey,
    getAllCodes,
    getCodeByKey,
    getAllKeys,
    searchKeys
}