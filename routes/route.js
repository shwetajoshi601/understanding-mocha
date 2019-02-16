var express = require('express');
var router = express.Router();
var request = require('request');
var handler = require('./routeHandlers.js');

router.post('/posttoslack', handler.routeHandler);

module.exports = router;