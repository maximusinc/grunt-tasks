/**
 * Created by user on 15.03.2016.
 */

var get_cached_features = require('./get_cached_features');
var grunt = require('grunt');
module.exports = function (arrFeatures, arrFeaturesPath, target, wspaConfig) {
    target = target || 'gadget';
    arrFeaturesPath = arrFeaturesPath || get_cached_features(grunt);
    var html = '';
    arrFeatures.forEach(function (name) {
        if (arrFeaturesPath[name] && arrFeaturesPath[name].length) {
            arrFeaturesPath[name].forEach(function (path) {

                if ((new RegExp(target+'.js$').test(path))){
                    html += '<script type="text/javascript" src="'+path+'"></script>\r\n';
                }

            });
        } else {
            grunt.log.warn("Feature "+ name + " is't exist in cached, try \"make:features\" command");
        }
    });
    //html += '<script>gadgets.config.init(' + wspaConfig + ');</script>';
    return html;
};
