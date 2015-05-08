'use strict';


var path = require('path');
var child_process = require('child_process');
var cmd = path.resolve(__dirname, '..', '..', 'cli.js');


module.exports = function (args, callback) {
    child_process.execFile(cmd, args, function (err, stdout, stderr) {
        callback(stderr || err, stdout);
    });
};