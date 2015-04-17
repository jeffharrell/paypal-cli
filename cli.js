#!/usr/bin/env node

'use strict';


var cb = require('./util/cb');
var minimist = require('minimist');
var settings = require('./util/settings');
var argv = minimist(process.argv.slice(2));
var action = argv._.shift();


var commands = {
	authenticate: require('./commands/authenticate'),
	payment: require('./commands/payment')
};


settings.get(function (err, config) {
	commands[action] && commands[action](config, argv, cb());
});