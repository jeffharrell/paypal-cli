'use strict';


var request = require('request');


function Payment(config) {
    var that = this;

    this.config = config;

    ['get', 'post', 'delete', 'patch', 'put'].forEach(
        function (verb) {
            that[verb] = function (url, data, callback) {
                that.api(verb, url, data, callback);
            };
        }
    );

    this.api = function (method, url, data, callback) {
        request({
            method: method,
            url: this.config.url + url,
            headers: {
                'Authorization': 'Bearer ' + this.config.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }, function (err, http, body) {
            callback(err, body);
        });
    };
}


Payment.prototype.create = function create(data, callback) {
    this.post('/v1/payments/payment', {
        intent: data.intent || 'sale',
        payer: {
            payment_method: data.payment_method || 'paypal'
        },
        transactions: [
            {
                amount: {
                    total: data.total,
                    currency: data.currency || 'USD'
                }
            }
        ],
        redirect_urls: {
            return_url: data.return_url,
            cancel_url: data.cancel_url
        }
    }, callback);
};


Payment.prototype.details = function details(data, callback) {
    this.get('/v1/payments/payment/' + data['payment-id'], {}, callback);
};


Payment.prototype.execute = function execute(data, callback) {
    this.post('/v1/payments/payment/' + data['payment-id'] + '/execute', {
        payer_id: data['payer-id']
    }, callback);
};





module.exports = function (config, options, callback) {
    var payment = new Payment(config);
    var action = options._.shift();

    payment[action] && payment[action](options, callback);
};
