'use strict';


var prompt = require('prompt');
var request = require('request');
var settings = require('./settings');


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
    ], authenticateApi);
};


function authenticateApi(err, options) {
    var auth = new Buffer(options.clientId + ':' + options.secret, 'binary').toString('base64');

    request({
        method: 'post',
        uri: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        headers: {
            'Authorization': 'Basic ' + auth,
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: 'grant_type=client_credentials'
    }, function (err, response, body) {
        var result = JSON.parse(body);
        var accessToken = result && result.access_token;

        if (err) {
            console.error(err);
        } else {
            save(accessToken);
        }
    });
}


function save(token) {
    var data = {
        accessToken: token
    };

    settings(data, function (err, result) {
        if (err) {
            console.error(err);
        }
    });
}
