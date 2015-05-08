'use strict';


var path = require('path');
var test = require('tape');
var cli = require('./util/cli');


test('Payment created', function (t) {
    t.plan(2);

    var args = [
        'payment',
        'create',
        '--total=1.00',
        '--return-url=http://example.com',
        '--cancel-url=http://example.com'
    ];

    cli(args, function (err, result) {
    	t.notOk(err, 'No error');
        t.ok(~result.indexOf('state: created'), 'Payment created successfully');
    });
});


test('Payment create missing arguments', function (t) {
    t.plan(2);

    var args = [
        'payment',
        'create',
        '--total=1.00',
    ];

    cli(args, function (err, result) {
    	t.ok(~err.indexOf('Missing required arguments: return_url, cancel_url'), 'Required arguments message');
        t.notOk(result);
    });
});
