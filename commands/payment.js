'use strict';


var Payment = require('paypal-api').payment;


module.exports = function (config, options, callback) {
    var payment = new Payment(config);
    var action = options._.shift();

    payment[action] && payment[action](options, callback);
};
