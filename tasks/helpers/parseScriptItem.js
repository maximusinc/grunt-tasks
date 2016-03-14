module.exports = function (grunt, distPath, item) {
	var pathModule = require('path');
    var res = [];
    item['script'] && item['script'].forEach(function (o) {
        if (o && o['$'] && o['$']['src']) {
            res.push( pathModule.join(distPath, o['$']['src']) );
        } else {
            grunt.log.error(o);
        }

    });
    return res;
};
