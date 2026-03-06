const express = require("express");
const workspaceController = require("../../controllers/workspaceController");
const { SUPER_ADMIN, ADMIN, OPERATOR, TESTER } = require('../../helpers/constants')
const { corsConfig } = require("../../configs/authConfig")
const { verifyToken, verifyRol } = require("../../middleware/authJwt")
const cors = require('cors')

const router = express.Router();

router.get('/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR, TESTER]), workspaceController.getAll)

router.post('/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN]), workspaceController.save)

router.put('/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN]), workspaceController.update)

router.get('/:identifier', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN]), workspaceController.getByIdentifier)

router.delete('/:identifier', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN]), workspaceController.deleteByIdentifier)

router.get('/:identifier/create-api-token', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN]), workspaceController.createApiToken)

module.exports = router;
