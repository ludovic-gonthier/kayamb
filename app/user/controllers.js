'use strict';

var login = {},
  register = {};

module.exports.login = login;
module.exports.register = register;

login.get = function (request, response, next) {
  response.end('Login Get!!');
};

login.post = function (request, response, next) {
  response.end('Login Post!!');
};

module.exports.logout = function (request, response, next) {
  response.end('Logout Get!!');
};

register.get = function (request, response, next) {
  response.end('Register Get!!');
};

register.post = function (request, response, next) {
  response.end('Register Post!!');
};

