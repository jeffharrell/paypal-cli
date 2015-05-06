'use strict';


var Payment = require('paypal-api').payment;
var callback = require('../util/cb');


module.exports = function (config, yargs) {
	var argv, payment, action;

	yargs.demand('total');
	yargs.demand('return_url');
	yargs.demand('cancel_url');

	argv = yargs.argv;
	payment = new Payment(config);
	action = argv._[1];

    payment[action] && payment[action](argv, callback);
};
