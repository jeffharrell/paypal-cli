'use strict';


var treeify = require('treeify');


module.exports = function (err, result) {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.log('');
        console.log(treeify.asTree(result, true));
        console.log('');
    }
};