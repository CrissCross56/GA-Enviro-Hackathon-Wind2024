const express = require('express');
const router = express.Router();
const openWeatherCtrl = require('../../controllers/api/openweather');



router.post('/', openWeatherCtrl.search);

module.exports = router;