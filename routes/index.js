'use strict';

var express = require('express'),
  path = require('path');

var router = new express.Router();

module.exports = router;

router.use('/homepage', require(path.join(__dirname, '../app/homepage/routes')));
router.use(require(path.join(__dirname, '../app/user/routes')));
