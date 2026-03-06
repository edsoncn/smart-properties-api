const express = require("express");
const smartPropertiesController = require("../../controllers/smartPropertiesController");
const { deprecated } = require("../../middleware/authJwt");

const router = express.Router();

router.get('/', deprecated, smartPropertiesController.getAllCodes)

router.get('/:key', deprecated, smartPropertiesController.getCodeByKey)

module.exports = router;
