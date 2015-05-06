#!/usr/bin/env node

'use strict';


var yargs = require('yargs');
var argv = yargs.argv;
var action = argv._[0];
var config = require('./util/config')();


var commands = {
    authenticate: require('./commands/authenticate'),
    payment: require('./commands/payment')
};


commands[action] && commands[action](config, yargs);