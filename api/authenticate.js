'use strict';


var util = require('util');
var Client = require('./Client');


function Auth(config) {
	this.config = config;
	Client.call(this);
}


util.inherits(Auth, Client);


Auth.prototype.authType = function authType() {
	return 'Basic ' + this.token;
};


Auth.prototype.contentType = function contentType() {
	return 'application/x-www-form-urlencoded; charset=utf-8';
};


Auth.prototype.body = function body(data) {
	return data;
};


Auth.prototype.login = function login(data, callback) {
	var errors = this.validate(data, ['clientId']);

	if (errors.length) {
		callback(new Error('Required value(s): ' + errors.join(', ')));
		return;
	}

    this.token = new Buffer(data.clientId + ':' + data.secret, 'binary').toString('base64');
    this.post('/v1/oauth2/token', 'grant_type=client_credentials', callback);
};


module.exports = Auth;