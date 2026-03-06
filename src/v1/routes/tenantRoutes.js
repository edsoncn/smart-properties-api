const express = require("express");
const tenantController = require("../../controllers/tenantController")
const { SUPER_ADMIN, ADMIN, OPERATOR, TESTER } = require('../../helpers/constants')
const { corsConfig } = require("../../configs/authConfig")
const { verifyToken, verifyRol } = require("../../middleware/authJwt")
const cors = require('cors')

const router = express.Router();

router.get('/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN]), tenantController.getAll)

router.post('/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN]), tenantController.save)

router.put('/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN]), tenantController.update)

router.get('/:identifier', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN]), tenantController.getByIdentifier)

router.delete('/:identifier', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN]), tenantController.deleteByIdentifier)

module.exports = router;
