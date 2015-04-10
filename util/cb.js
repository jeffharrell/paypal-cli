'use strict';


var treeify = require('treeify');


function tryParse(str) {
    var result;

    try {
        result = JSON.parse(str);
    } catch (e) {
        result = {
            response: str
        };
    }

    return result;
}


module.exports = function (callback) {
    callback = callback || function (err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            result = tryParse(result);

            console.log('');
            console.log(treeify.asTree(result, true));
            console.log('');
        }
    };

    return callback;
};