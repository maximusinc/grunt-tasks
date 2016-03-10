module.exports = function (grunt){
    var readWidgetDeps = require('./helpers/readWidgetDeps');
    var getUnique = require('./helpers/getUnique');
    var cachedFeatures = require('./helpers/get_cached_features');
    /**
     * fix problem of resolving features from up folder
     * @param  {string} str [description]
     */
    var reccurReplacer = function (search, replace, str) {
        if (str.indexOf(search) !== -1) {
            return reccurReplacer( search, replace, str.replace(search, replace) );
        } else {
            return str;
        }
    };
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
                        var normalizer = reccurReplacer.bind(null, '.tmp/', '../');
                        arrFeatures = arrFeatures.concat(readWidgetDeps(grunt, normalizer(path), normalizer));
                    }
                });
            }
            //grunt.task.run('dependency:show_feature:'+featureName);
        });
        arrFeatures = getUnique(arrFeatures).map(function (path) {
            return reccurReplacer.bind(null, '../', '.tmp/')(path);
        });
        grunt.log.debug('arr features');
        grunt.log.debug(arrFeatures);
        grunt.config('widget.deps.features', getUnique(arrFeatures));
        grunt.task.run('cache_widget_features');
    });
};
