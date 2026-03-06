const express = require("express");
const smartPropertyControllerV2 = require("../../controllers/smartPropertyControllerV2");
const { corsConfig } = require("../../configs/authConfig")
const { SUPER_ADMIN, ADMIN, OPERATOR, TESTER } = require('../../helpers/constants')
const { verifyApiToken } = require("../../middleware/authJwt")
const cors = require('cors')

const router = express.Router();

router.get('/:workspace/', cors(corsConfig), verifyApiToken, smartPropertyControllerV2.getAllCodes)

router.get('/:workspace/:identifier/', cors(corsConfig), verifyApiToken, smartPropertyControllerV2.getCodeByIdentifier)

module.exports = router;
