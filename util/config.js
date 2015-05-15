'use strict';


var fs = require('fs');
var path = require('path');
var file = [process.env.USERPROFILE || process.env.HOME, '.paypal-cli'].join(path.sep);


var DEFAULTS = {
	client_id: '',
	client_secret: '',
	format: 'text',
	mode: 'sandbox'
};



module.exports = function (data) {
	if (data) {
		return write(data);
	} else {
		return read();
	}
};


function merge(obj1, obj2) {
	for (var key in obj2) {
		if (DEFAULTS[key] !== undefined) {
			obj1[key] = obj2[key];
		}
	}
}


function read() {
	var config;
	var result;

	try {
		result = fs.readFileSync(file);
		config = JSON.parse(result.toString());
	} catch (e) {
		config = DEFAULTS;
	}

	return config;
}


function write(data) {
	var config = read();

	merge(config, data);

	return fs.writeFileSync(file, JSON.stringify(config));
}