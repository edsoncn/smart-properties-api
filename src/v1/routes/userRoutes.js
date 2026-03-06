const express = require("express");
const userController = require("../../controllers/userController");
const { SUPER_ADMIN, ADMIN, OPERATOR, TESTER } = require('../../helpers/constants')
const { corsConfig } = require("../../configs/authConfig")
const { verifyToken, verifyRol } = require("../../middleware/authJwt")
const cors = require('cors')

const router = express.Router();

router.get('/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN]), userController.getAll)

router.post('/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN]), userController.save)

router.put('/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR, TESTER]), userController.update)

router.get('/:identifier', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR, TESTER]), userController.getByIdentifier)

router.delete('/:identifier', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN]), userController.deleteByIdentifier)

module.exports = router;
