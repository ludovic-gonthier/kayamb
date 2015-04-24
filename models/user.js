'use strict';

var database = require(__dirname + '/../database'),
  bcrypt = require('bcrypt-nodejs'),
  SALT_GRAIN = 10;

var schema = new database.Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true,
  }
});

schema.methods.pwd = function () {
  var user = this;

  return {
    hash: function (salt, callback) {
      bcrypt.hash(user.password, salt, null, function (error, hash) {
        if (error) {
          return callback(error);
        }

        callback(null, hash);
      });
    },
    validate: function (password, callback) {
      bcrypt.compare(password, user.password, function (error, matched) {
        if (error) {
          return callback(error);
        }

        callback(null, matched);
      });
    }
  };
};

schema.pre('save', function (next) {
  var user = this;

  if (!user.isModified()) {
    return next();
  }

  bcrypt.genSalt(SALT_GRAIN, function (error, salt) {
    if (error) {
      return next(error);
    }

    user.pwd().hash(salt, function (error, hash) {
      if (error) {
        console.log('pwd.hash');
        console.log(error);
        return next(error);
      }

      user.password = hash;
      next();
    });
  });
});

module.exports = database.model('User', schema);
