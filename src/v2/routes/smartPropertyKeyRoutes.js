const express = require("express");
const smartPropertyControllerV2 = require("../../controllers/smartPropertyControllerV2");
const { corsConfig } = require("../../configs/authConfig")
const { SUPER_ADMIN, ADMIN, OPERATOR, TESTER } = require('../../helpers/constants')
const cors = require('cors')

const router = express.Router();

router.get('/:workspace/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR, TESTER]), smartPropertyControllerV2.getAllKeys)

module.exports = router;
