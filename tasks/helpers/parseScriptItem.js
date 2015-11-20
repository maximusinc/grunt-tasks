module.exports = function (grunt, distPath, item) {
    var res = [];
    item['script'] && item['script'].forEach(function (o) {
        if (o && o['$'] && o['$']['src']) {
            res.push(distPath + '/' + o['$']['src']);
        } else {
            grunt.log.error(o);
        }

    });
    return res;
};
