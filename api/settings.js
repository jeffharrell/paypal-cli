'use strict';


var fs = require('fs');
var path = require('path');
var file = [process.env.USERPROFILE || process.env.HOME, '.paypal-cli'].join(path.sep);

var defaults = {
	accessToken: null,
	format: 'text',
	url: 'https://api.sandbox.paypal.com'
};


function read(callback) {
	fs.readFile(file, function (err, result) {
		var settings;
		
		try {
			settings = JSON.parse(result.toString());
		} catch (e) {
			settings = defaults;
		}

		callback(null, settings);
	});
}


function write(data, callback) {
	read(function (err, settings) {
		if (err) {
			callback(err);
		} else {
			merge(settings, data);

			fs.writeFile(file, JSON.stringify(settings), function (err) {
				callback(err, settings);
			});
		}
	});
}


function merge(obj1, obj2) {
	for (var key in obj2) {
		if (defaults[key] !== undefined) {
			obj1[key] = obj2[key];
		}
	}
}


module.exports = function (options, callback) {
	if (options) {
		write(options, callback);
	} else {
		read(callback);
	}
};