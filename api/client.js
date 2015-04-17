'use strict';


var request = require('request');


function ApiClient() {
    if (!this.config) {
        throw new Error('config must be set');
    }
}


ApiClient.prototype.authType = function authType() {
    return 'Bearer ' + this.config.accessToken;
};


ApiClient.prototype.contentType = function contentType() {
    return 'application/json';
};


ApiClient.prototype.url = function url(path) {
    return this.config.url + path;
};


ApiClient.prototype.body = function body(data) {
    return JSON.stringify(data);
};

ApiClient.prototype.api = function api(method, path, data, callback) {
    request({
        method: method,
        url: this.url(path),
        headers: {
            'Authorization': this.authType(),
            'Content-Type': this.contentType()
        },
        body: this.body(data)
    }, function (err, http, body) {
        var result;

        try {
            result = JSON.parse(body);
        } catch (e) {
            err = e;
        }

        if (http.statusCode === 401) {
            err = new Error(result.error_description);
        }

        callback(err, result);
    });
};


ApiClient.prototype.validate = function validate(data, keys) {
    var errors = [];

    keys.forEach(function (key) {
        if (!data[key]) {
            errors.push(key);
        }
    });

    return errors;
};


['get', 'post', 'delete', 'patch', 'put'].forEach(
    function (verb) {
        ApiClient.prototype[verb] = function (url, data, callback) {
            this.api(verb, url, data, callback);
        };
    }
);



module.exports = ApiClient;