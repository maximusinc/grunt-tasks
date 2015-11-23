module.exports = function (grunt){
    var readWidgetDeps = require('./helpers/readWidgetDeps');
    var getUnique = require('./helpers/getUnique');
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
                        arrFeatures = arrFeatures.concat(readWidgetDeps(grunt, path));
                    }
                });
            }
            //grunt.task.run('dependency:show_feature:'+featureName);
        });
        grunt.config('widget.deps.features', getUnique(arrFeatures));
    });
};
