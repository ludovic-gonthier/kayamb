'use strict';

var path = require('path'),
  url = require('url'),
  nconf = require('nconf');

var directory = path.resolve(__dirname, '..', 'config');

var conf = new nconf.Provider();

module.exports = conf;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.ROOT_PATH = path.join(__dirname, '..');

conf.argv().env()
  .file('default', path.join(directory, 'config.json'));

conf.set('base-dir', path.join(__dirname, '..'));
conf.set('app-dir', path.join(__dirname, '..', 'app'));
conf.set('database:url', url.format({
  protocol: 'mongodb',
  slashes: true,
  auth: conf.get('database:user') + ':' + conf.get('database:password'),
  hostname: conf.get('database:hostname'),
  port: conf.get('database:port'),
  pathname: conf.get('database:db')
}));
