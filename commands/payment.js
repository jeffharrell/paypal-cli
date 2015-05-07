'use strict';


var callback = require('../util/cb');
var Payment = require('paypal-api').payment;


module.exports = function (config, yargs) {
    var argv = yargs.argv;
    var command = argv._[1];
    var payment = new Payment(config);


    switch(command) {
    case 'create':
        yargs.demand('total');
        yargs.demand('return_url');
        yargs.demand('cancel_url');
        yargs.default('intent', 'sale');
        yargs.default('currency', 'USD');
        yargs.default('payment_method', 'paypal');
        
        yargs.alias('return-url', 'return_url');
        yargs.alias('cancel-url', 'cancel_url');
        yargs.alias('payment-method', 'payment_method');

        payment.create(yargs.argv, callback);
        break;

    case 'details':
        yargs.demand('payment-id');

        payment.details(yargs.argv, callback);
        break;

    case 'execute':
        yargs.demand('payment-id');
        yargs.demand('payer-id');

        payment.create(yargs.argv, callback);
        break;

    default:
        yargs.showHelp();
    }

};
