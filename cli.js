#!/usr/bin/env node

'use strict';


var cb = require('./util/cb');
var minimist = require('minimist');
var settings = require('./api/settings');
var argv = minimist(process.argv.slice(2));
var action = argv._.shift();


var commands = {
	authenticate: require('./api/authenticate'),
	invoice: require('./api/invoice'),
	payment: require('./api/payment'),
	settings: require('./api/settings'),
	webhook: require('./api/webhook')
};


settings(null, function (err, config) {
	commands[action] && commands[action](config, argv, cb());
});