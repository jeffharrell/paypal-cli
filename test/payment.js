'use strict';


var path = require('path');
var test = require('tape');
var child_process = require('child_process');
var cli = path.resolve(__dirname, '..', 'cli.js');


test('Payment create', function (t) {
    t.plan(1);

    var args = [
        'payment', 
        'create', 
        '--total=1.00', 
        '--return-url=http://example.com', 
        '--cancel-url=http://example.com'
    ];

    child_process.execFile(cli, args, function (err, stdout, stderr) {
        t.ok(~stdout.indexOf('state: created'));
    });
});
