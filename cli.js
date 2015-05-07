#!/usr/bin/env node

'use strict';


var fs = require('fs');
var path = require('path');


var yargs = require('yargs')
    .usage(fs.readFileSync(path.resolve(__dirname, 'USAGE')).toString())
    .help('h')
    .alias('h', 'help')
    .showHelpOnFail(false, 'Specify --help for available options')
    .alias('v', 'version')
    .version(require('./package').version);

var argv = yargs.argv;
var action = argv._[0];
var config = require('./util/config')();

var commands = {
    authenticate: require('./commands/authenticate'),
    payment: require('./commands/payment')
};



if (commands[action]) {
    commands[action](config, yargs);
} else {
    yargs.showHelp();
}