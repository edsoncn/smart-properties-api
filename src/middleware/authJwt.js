const jwt = require("jsonwebtoken");
const authConfig = require("../configs/authConfig");
const workspaceService = require("../services/workspaceService");
const exceptions = require('../configs/execeptionsConfig');
const { SUPER_ADMIN, SMARTPROPERTIES_TENANT } = require("../helpers/constants");

verifyToken = (req, res, next) => {
    let cookies = parseCookies(req);
    let token = cookies.token;
    
    if (!token) {
        exceptions.handleErrorResponse(exceptions.forbiddenError, res);
    } else {
        const tenant = authConfig.getTenant(req);

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            //console.log("Token decoded:");
            //console.log(decoded);
            if (err) {
                console.log(err);
                exceptions.handleErrorResponse(exceptions.unauthorizedError, res);
            } else if(decoded.rol === SUPER_ADMIN || tenant === decoded.tenant){
                req.userId = decoded.id;
                req.userRol = decoded.rol;
                next();
            } else {
                console.log('Different tenant error. Expect ' + decoded.tenant + ' tenant is different to ' + tenant);
                exceptions.handleErrorResponse(exceptions.unauthorizedError, res);
            }
        });
    }
};

verifyRol = (roles) => {
    return (req, res, next) => {
        let rol = req.userRol;

        //console.log(roles);
        if(roles.includes(rol)){
            next();
        }else{
            console.log('Rol not allowed: ' + rol)
            exceptions.handleErrorResponse(exceptions.unauthorizedError, res);
        }
    }
}

verifyApiToken = (req, res, next) => {
    let authorizationToken = req.headers['authorization']; 
    const tenant = authConfig.getTenant(req);
    const { workspace } = req.params;

    if(authorizationToken){
        workspaceService.getToken(tenant, workspace)
        .then((token) => {
            if(workspaceService.validateApiToken(tenant, workspace, token, authorizationToken)) {
                next()
            }else{
                exceptions.handleErrorResponse(exceptions.unauthorizedError, res);
            }
        })
        .catch((e) => {
            exceptions.handleErrorResponse(e, res);
        })
    }else{
        verifyToken(req, res, next);
    }
}

deprecated = (req, res, next) => {
    res.status(410).send();
}

parseCookies = (req) => {
    const coockies = {};
    const cookieHeader = req.headers?.cookie;
    if (!cookieHeader) return coockies;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        coockies[name] = decodeURIComponent(value);
    });

    return coockies;
}
  
module.exports = {
    verifyToken,
    verifyRol,
    verifyApiToken,
    deprecated
}