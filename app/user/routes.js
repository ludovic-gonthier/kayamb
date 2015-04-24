'use strict';

var express = require('express'),
  path = require('path'),
  user = require('./controllers');

var router = new express.Router();

module.exports = router;

/**
 * Routes definition of the user module
 */
router.get('/register', user.register.get);
router.post('/register', user.register.post);

router.get('/login', user.login.get);
router.post('/login', user.login.post);

router.get('/logout', user.login.get);
