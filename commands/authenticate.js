'use strict';


var prompt = require('prompt');
var request = require('request');
var settings = require('../util/settings');
var Auth = require('../api/authenticate');


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

    var data = {
        accessToken: result.access_token
    };

    settings.set(data, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log('Success!');
        }
    });
}
