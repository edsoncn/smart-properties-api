const express = require("express");
const smartPropertiesController = require("../../controllers/smartPropertiesController");
const { deprecated } = require("../../middleware/authJwt");

const router = express.Router();

router.get('/', deprecated, smartPropertiesController.getAll)

router.post('/', deprecated, smartPropertiesController.save)

router.get('/:key', deprecated, smartPropertiesController.getByKey)

router.delete('/:key', deprecated, smartPropertiesController.deleteByKey)

module.exports = router;