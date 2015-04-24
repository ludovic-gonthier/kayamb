'use strict';
console.log(process.env.ROOT_PATH);

var User = require(process.env.ROOT_PATH + '/models/user');

module.exports.index = function (request, response) {

  User.findOne({email: 'test@test.test'}, function (error, user) {
    if (error) {
      throw error;
    }

    user.pwd().validate('my_password', function (error, matched) {
      if (matched) {
        response.redirect('/');
      }
    });
  });
}

module.exports.post = function (request, response) {
  response.end('Homepage post index');
}
