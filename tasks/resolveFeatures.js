module.exports = function (grunt){
    var readWidgetDeps = require('./helpers/readWidgetDeps');
    var getUnique = require('./helpers/getUnique');
    var upPathNormalizer = require('./helpers/upPathNormalizer');
    var cachedFeatures = require('./helpers/get_cached_features');

    grunt.registerTask('resolveFeatures', function (target) {
        target = target ? target : 'gadget';
        var arrFeaturesNames = grunt.config('widget.deps.features') || [],
            arrFeatures = [],
            features = grunt.config('features');
        if (!Object.keys(features).length) {
            features = cachedFeatures(grunt);
        }
        if (!Object.keys(features).length) {
            grunt.fail.fatal('Can"t resolve features');
        }
        arrFeaturesNames.forEach(function (featureName) {
            if (features[featureName] && features[featureName].length) {
                features[featureName].forEach(function (path) {

                    if ((new RegExp(target+'.js$').test(path))) {
                        var normalizer = upPathNormalizer.makeUpFromTmp;
                        arrFeatures = arrFeatures.concat(readWidgetDeps(grunt, normalizer(path), normalizer));
                    }
                });
            }
            //grunt.task.run('dependency:show_feature:'+featureName);
        });
        arrFeatures = getUnique(arrFeatures).map(function (path) {
            return upPathNormalizer.makeTmpFromUp(path).replace(/\\/g, '/');
        });
        grunt.log.debug('arr features');
        grunt.log.debug(arrFeatures);
        grunt.config('widget.deps.features', getUnique(arrFeatures));
        grunt.task.run('cache_widget_features');
    });
};
