'use strict';


var path = require('path');
var test = require('tape');
var child_process = require('child_process');
var cli = path.resolve(__dirname, '..', 'cli.js');


var clientId = process.env.PAYPAL_CLI_CLIENT;
var secret = process.env.PAYPAL_CLI_SECRET;


test('Successful authentication', function (t) {
    t.plan(2);

    var args = [
        'authenticate',
        '--clientId=' + clientId,
        '--secret=' + secret
    ];

    child_process.execFile(cli, args, function (err, stdout, stderr) {
        console.log(stderr);
        t.ok(!stderr, 'No error returned');
        t.ok(stdout === '', 'Assume we have the token');
    });
});


test('Unsuccessful authentication', function (t) {
    t.plan(1);

    var args = [
        'authenticate',
        '--clientId=fake',
        '--secret=user'
    ];

    child_process.execFile(cli, args, function (err, stdout, stderr) {
        t.ok(~stderr.indexOf('Unauthorized'), 'User is not logged in');
    });
});
