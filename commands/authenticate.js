'use strict';


var prompt = require('prompt');
var config = require('../util/config');
var Auth = require('paypal-api').authenticate;


module.exports = function (config, options) {
    prompt.start();
    prompt.message = '';
    prompt.delimiter = '';
    prompt.override = options;

    prompt.get([
        {
            name: 'clientId',
            description: 'Client Id:',
            required: true
        },
        {
            name: 'secret',
            description: 'Secret:',
            required: true,
            hidden: true
        }
    ], function (err, options) {
        if (err) {
            console.error(err);
        } else {
            var auth = new Auth(config);
            auth.login(options, save);
        }
    });
};



function save(err, result) {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    config({
        accessToken: result.access_token
    });
}
