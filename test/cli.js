'use strict';


var fs = require('fs');
var path = require('path');
var test = require('tape');
var cli = require('./util/cli');


test('Display help', function (t) {
    t.plan(2);

    cli(['--help'], function (err, result) {
        var expected = fs.readFileSync(path.resolve(__dirname, '..', 'USAGE'), {
            encoding: 'utf8'
        });

        t.notOk(err, 'No error');
        t.ok(result.indexOf(expected) === 0, 'Help content matches usage');
    });
});


test('Display version', function (t) {
    t.plan(2);

    cli(['--version'], function (err, result) {
        var expected = require('../package').version;

        t.notOk(err, 'No error');
        t.ok(result.indexOf(expected) === 0, 'Version matches package.json');
    });
});
