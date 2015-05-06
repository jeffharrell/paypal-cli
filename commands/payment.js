'use strict';


var callback = require('../util/cb');
var Payment = require('paypal-api').payment;


module.exports = function (config, yargs) {
    var argv, payment, action;

    yargs.demand('total');
    yargs.demand('return_url');
    yargs.demand('cancel_url');
    yargs.default('intent', 'sale');
    yargs.default('currency', 'USD');
    yargs.default('payment_method', 'paypal');


    argv = yargs.argv;
    payment = new Payment(config);
    action = argv._[1];

    if (payment[action]) {
        payment[action](argv, callback);
    } else {
        yargs.showHelp();
    }
};
