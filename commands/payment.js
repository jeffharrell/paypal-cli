'use strict';


var callback = require('../util/cb');
var paypal = require('paypal-rest-sdk');


module.exports = function (config, yargs) {
    var command = yargs.argv._[1];
    var options;
    var payload;
    

    paypal.configure(config);


    switch(command) {
    case 'create':
        yargs.demand('total');
        yargs.demand('return_url');
        yargs.demand('cancel_url');

        yargs.default('intent', 'sale');
        yargs.default('currency', 'USD');
        yargs.default('payment_method', 'paypal');
        yargs.default('description', '');

        yargs.alias('return-url', 'return_url');
        yargs.alias('cancel-url', 'cancel_url');
        yargs.alias('payment-method', 'payment_method');

        options = yargs.argv;

        payload = {
            intent: options.intent,
            payer: {
                payment_method: options.payment_method
            },
            redirect_urls: {
                return_url: options.return_url,
                cancel_url: options.cancel_url
            },
            transactions: [{
                amount: {
                    currency: options.currency,
                    total: options.total
                },
                description: options.description
            }]
        };

        paypal.payment.create(payload, callback);
        break;

    case 'get':
        yargs.demand('payment_id');
        yargs.alias('payment-id', 'payment_id');

        options = yargs.argv;

        paypal.payment.get(options.payment_id, callback);
        break;

    case 'execute':
        yargs.demand('payment_id');
        yargs.demand('payer_id');

        yargs.alias('payment-id', 'payment_id');
        yargs.alias('payer-id', 'payer_id');

        options = yargs.argv;

        payload = {
            payer_id: options.payer_id
        };

        if (options.total) {
            payload.transactions = [{
                amount: { 
                    total: options.total
                }
            }];
        }

        paypal.payment.execute(options.payment_id, payload, callback);
        break;

    case 'list': 
        yargs.default('count', 10);
        yargs.default('start_index', 1);

        options = yargs.argv;

        payload = {
            count: options.count,
            start_index: options.start_index
        }

        paypal.payment.list(payload, callback);
        break;

    default:
        yargs.showHelp();
    }

};
