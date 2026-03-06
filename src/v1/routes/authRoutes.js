const express = require("express");
const { corsConfig } = require("../../configs/authConfig")
const authController = require("../../controllers/authController");
const cors = require('cors')

const router = express.Router();

router.post('/signin/', cors(corsConfig), authController.signin)

router.post('/logout/', cors(corsConfig), authController.logout)

module.exports = router;
