const userService = require('../services/userService');
const exceptions = require('../configs/execeptionsConfig');
const authConfig = require('../configs/authConfig')

const getAll = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Get User All');
    // #swagger.tags = ['User']
    
    userService.getAll(tenant)
    .then((users) => {
        res.status(200).send(users);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const save = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Save User');
    // #swagger.tags = ['User']

    let user = req.body;
    let password;

    if(!user.password){
        password = authConfig.generateSimplePassword();
        user['password'] = password;
    }else{
        password = user.password;
    }

    userService.save(tenant, user)
    .then(() => {
        let message = {
            from: "admin@carpinform.com",
            to: user.email,
            subject: "Smart Properties: Your user was created",
            text: `Hi ${user.name},\n\n` + 
                'Your Smart Propeties user was created.\n\n' + 
                `Login url: ${req.headers.origin}/${tenant}/auth/login\n` + 
                `Temporal password: ${password}\n\n` + 
                'Regards'
        }
        console.log("Sending email:");
        console.log(message);
   
        authConfig.emailTransporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(`An error occurred sending email to ${user.email}`);
                console.log(err);
                console.log(`Deleting user ${user.email}`);
                userService.deleteByIdentifier(tenant, identifier)
                .then(() => {
                    exceptions.handleErrorResponse(exceptions.serverError, res);
                })
                .catch((e) => {
                    exceptions.handleErrorResponse(e, res);
                })
            } else {
                console.log(`Email sent to ${user.email}`);
                console.log(info);
                res.status(201).send();
            }
        });
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const update = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Update User');
    // #swagger.tags = ['User']

    let user = req.body;

    userService.update(tenant, user)
    .then(() => {
        res.status(200).send();
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const getByIdentifier = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Get User by Identifier');
    // #swagger.tags = ['User']

    const { identifier } = req.params;

    userService.getByIdentifier(tenant, identifier)
    .then((tenant) => {
        res.status(200).send(tenant);
    })
    .catch((e) => {
        exceptions.handleErrorResponse(e, res);
    })
}

const deleteByIdentifier = (req, res) => {
    const tenant = authConfig.getTenant(req);
    console.log('Delete User by Identifier');
    // #swagger.tags = ['User']
    
    const { identifier } = req.params;

    userService.deleteByIdentifier(tenant, identifier)
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