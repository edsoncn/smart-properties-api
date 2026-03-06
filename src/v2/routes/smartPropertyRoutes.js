const express = require("express");
const smartPropertyControllerV2 = require("../../controllers/smartPropertyControllerV2");
const { corsConfig } = require("../../configs/authConfig")
const { SUPER_ADMIN, ADMIN, OPERATOR, TESTER } = require('../../helpers/constants')
const cors = require('cors')

const router = express.Router();

router.get('/:workspace/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR]), smartPropertyControllerV2.getAll)

router.post('/:workspace/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR]), smartPropertyControllerV2.save)

router.put('/:workspace/', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR]), smartPropertyControllerV2.update)

router.get('/:workspace/:identifier', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR, TESTER]), smartPropertyControllerV2.getByIdentifier)

router.delete('/:workspace/:identifier', cors(corsConfig), verifyToken, verifyRol([SUPER_ADMIN, ADMIN, OPERATOR]), smartPropertyControllerV2.deleteByIdentifier)

module.exports = router;
