'use strict';


var path = require('path');
var test = require('tape');
var cli = require('./util/cli');


var clientId = process.env.PAYPAL_CLI_CLIENT;
var secret = process.env.PAYPAL_CLI_SECRET;


test('Successful authentication', function (t) {
    t.plan(2);

    if (!clientId || !secret) {
    	t.fail('process.env.PAYPAL_CLI_CLIENT and process.env.PAYPAL_CLI_SECRET must be set! Exiting.');
    	process.exit(1);
    }

    var args = [
        'authenticate',
        '--clientId=' + clientId,
        '--secret=' + secret
    ];

    cli(args, function (err, result) {
        t.notOk(err, 'No error');
        t.ok(result == '', 'Exit cleanly');
    });
});


test('Unsuccessful authentication', function (t) {
    t.plan(2);

    var args = [
        'authenticate',
        '--clientId=fake',
        '--secret=user'
    ];

    cli(args, function (err, result) {
    	t.ok(err, 'Error is returned');
        t.notOk(result, 'Result is empty');
    });
});
