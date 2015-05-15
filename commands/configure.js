'use strict';


var prompt = require('prompt');
var config = require('../util/config');


module.exports = function (config, yargs) {
	yargs.default('client_id', null);
	yargs.default('client_secret', null);
    yargs.default('mode', 'sandbox');

    yargs.alias('client-id', 'client_id');
    yargs.alias('secret', 'client_secret');

    prompt.start();
    prompt.message = '';
    prompt.delimiter = '';
    prompt.override = yargs.argv;

    prompt.get([
        {
            name: 'client_id',
            description: 'Client Id:',
            required: true
        },
        {
            name: 'client_secret',
            description: 'Secret:',
            required: true,
            hidden: true
        },
        {
            name: 'mode',
            description: 'Environment:',
            required: true
        }
    ], save);
};




function save(err, result) {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    config(result);
}
