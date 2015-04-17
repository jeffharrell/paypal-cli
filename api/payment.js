'use strict';


var util = require('util');
var Client = require('./Client');


function Payment(config) {
	this.config = config;
	Client.call(this);
}


util.inherits(Payment, Client);


Payment.prototype.create = function create(data, callback) {
	var errors = this.validate(data, ['total', 'return_url', 'cancel_url']);

	if (errors.length) {
		callback(new Error('Required value(s): ' + errors.join(', ')));
		return;
	}

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
	var errors = this.validate(data, ['payment-id']);

	if (errors.length) {
		callback(new Error('Required value(s): ' + errors.join(', ')));
		return;
	}

    this.get('/v1/payments/payment/' + data['payment-id'], null, callback);
};


Payment.prototype.execute = function execute(data, callback) {
	var errors = this.validate(data, ['payment-id', 'payer-id']);

	if (errors.length) {
		callback(new Error('Required value(s): ' + errors.join(', ')));
		return;
	}

    this.post('/v1/payments/payment/' + data['payment-id'] + '/execute', {
        payer_id: data['payer-id']
    }, callback);
};


module.exports = Payment;