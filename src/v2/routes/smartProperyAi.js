const express = require("express");
const aiController = require("../../controllers/aiController");
const aiControllerTest = require("../../controllers/aiControllerTest");
const { corsConfig } = require("../../configs/authConfig")
const { SUPER_ADMIN, ADMIN, OPERATOR } = require('../../helpers/constants')
const cors = require('cors')

const router = express.Router();

router.post('/explain-code/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR]), aiController.explainCode)

router.post('/generate-test-cases/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR]), aiController.generateTestCases)

router.post('/generate-code/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR]), aiController.generateCode)

router.post('/update-code/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR]), aiController.updateCode)

module.exports = router;
