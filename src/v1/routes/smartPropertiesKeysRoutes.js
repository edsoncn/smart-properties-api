const express = require("express");
const smartPropertiesController = require("../../controllers/smartPropertiesController");
const { deprecated } = require("../../middleware/authJwt");

const router = express.Router();

router.get('/', deprecated, smartPropertiesController.getAllKeys)

router.get('/:searchTerm', deprecated, smartPropertiesController.searchKeys)

module.exports = router;
