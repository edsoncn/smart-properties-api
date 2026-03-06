const constants = require('../helpers/constants')
const userService = require('../services/userService')
const tenantService = require('../services/tenantService')
const exceptions = require('../configs/execeptionsConfig')
const nodemailer = require('nodemailer');

const initUserData = () => {
    let userSaveOrUpsert = constants.INIT_DATA_FORCE ? userService.upsert : userService.save;
    let tenantSaveOrUpsert = constants.INIT_DATA_FORCE ? tenantService.upsert : tenantService.save;
    let tenant = {
        identifier : constants.SMARTPROPERTIES_TENANT,
        name : 'Smart Properties S.A.',
        icon : ''
    };
    let user = {
        email : 'super-admin@smartproperties.com', 
        name: 'Super Admin',
        password: constants.SUPER_ADMIN_PASSWORD,
        rol: 'super-admin',
        icon: ''
    }

    tenantSaveOrUpsert(tenant)
    .then(() => {
        console.log('Tenant created');
    })
    .catch((e) => {
        exceptions.handleError(e);
    })
    userSaveOrUpsert(tenant.identifier, user)
    .then(() => {
        console.log('User created');
    })
    .catch((e) => {
        exceptions.handleError(e);
    })
};

const allowedOrigins = [
  'http://localhost:3000',
  'https://smart-properties-app-btbpata8bahnhjdf.eastus2-01.azurewebsites.net'
];

const corsConfig = {
    credentials: true, 
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the origin
        } else {
            callback(new Error('Not allowed by CORS'), false); // Deny the origin
        }
    }
};

const getTenant = (req) => {
    let tenant = req.baseUrl.split('/')[3];

    if(tenant === 'tenant') tenant = constants.SMARTPROPERTIES_TENANT;
    return tenant;
};

const emailTransporter = nodemailer.createTransport({
    host: 'mboxhosting.com',
    port: 465,
    auth: {
        user: "admin@carpinform.com",
        pass: "8hCAdFXKHaEJwJRR"
    }
})

const generateSimplePassword = () => {
    let letters = 'abcdefghijklmnopqrstuvxyz0123456789';
    let size = 4;
    let password = '';
    let min = 0;
    let max = letters.length - 1;
    
    for(let i=0; i<size; i++) {
        password += letters.charAt(Math.floor(Math.random() * (max - min + 1) + min));
    }

    return password;
}

module.exports = {
    initUserData,
    getTenant,
    corsConfig,
    secret: "smartprop-jXn2r5u8-secret-key",
    emailTransporter,
    generateSimplePassword
};