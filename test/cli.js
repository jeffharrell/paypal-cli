'use strict';


var fs = require('fs');
var path = require('path');
var test = require('tape');
var child_process = require('child_process');
var cli = path.resolve(__dirname, '..', 'cli.js');


test('Display help', function (t) {
    t.plan(1);

    child_process.execFile(cli, ['--help'], function (err, stdout, stderr) {
        var expected = fs.readFileSync(path.resolve(__dirname, '..', 'USAGE'), { 
            encoding: 'utf8'
        });

        t.ok(stdout.indexOf(expected) === 0);
    });
});


test('Display version', function (t) {
    t.plan(1);

    child_process.execFile(cli, ['--version'], function (err, stdout, stderr) {
        var expected = require('../package').version;

        t.ok(stdout.indexOf(expected) === 0);
    });
});
