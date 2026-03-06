const authConfig = require('../configs/authConfig')
const userService = require('../services/userService')
const workspaceService = require('../services/workspaceService')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const exceptions = require('../configs/execeptionsConfig')
const { Base64 } = require('js-base64');

const signin = (req, res) => {
    const tenant = authConfig.getTenant(req);
    const { email } = req.body;
    const { password } = req.body;
    let identifier = Base64.encode(email);
    // #swagger.tags = ['Auth']

    userService.getByIdentifier(tenant, identifier)
    .then((user) => {
        if(user){
            let passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) {
                exceptions.handleErrorResponse(exceptions.unauthorizedError, res);
            } else {

                var token = jwt.sign({ id: identifier, rol: user.rol, tenant }, authConfig.secret, {
                    expiresIn: 86400 // 24 hours
                });

                res.cookie('token', token, { httpOnly: true, maxAge: 24*60*60*1000 });
                res.status(200).send({
                    userId: identifier,
                    userName: user.name,
                    userEmail: user.email,
                    userIcon: user.icon,
                    userRol: user.rol
                });
            }
        }else{
            exceptions.handleErrorResponse(exceptions.unauthorizedError, res);
        }
    })
    .catch((e) => {
        if(exceptions.isNotFoundError(e)){
            exceptions.handleErrorResponse(exceptions.unauthorizedError, res);
        }else{
            exceptions.handleErrorResponse(e, res);
        }
    })
}

const logout = (req, res) => {
    res.clearCookie("token");
    res.clearCookie("userId");
    res.end();
    res.status(200);
    // #swagger.tags = ['Auth']
}

module.exports = {
    signin,
    logout
}