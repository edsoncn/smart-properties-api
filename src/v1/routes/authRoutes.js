const express = require("express");
const { corsConfig } = require("../../configs/authConfig")
const authController = require("../../controllers/authController");
const cors = require('cors')

const router = express.Router();

router.get('/health-check/', cors(corsConfig), (req, res) => {
    res.status(200).send({ message: 'Auth service is healthy' });
})

router.post('/signin/', cors(corsConfig), authController.signin)

router.post('/logout/', cors(corsConfig), authController.logout)

module.exports = router;
