/**
 * Created by user on 15.03.2016.
 */

/**
 * Core functionality - resolve features
 * Get array of features and return resolved features with dependencies
 */

var cachedFeatures = require('./get_cached_features');
var getUnique = require('./getUnique');
var grunt = require('grunt');
var featuresDepsStore = require('./featuresDepsStore');

module.exports = function (arrFeaturesNames) {
    var features = cachedFeatures(grunt);
    var featuresDeps = featuresDepsStore.getCachedStore();
    var resolved = [];
    var recurResolver = function(name, arrResolved) {
        arrResolved.push(name);
        if (featuresDeps && featuresDeps[name] && featuresDeps[name].length) {
            featuresDeps[name].forEach(function (name) {
               recurResolver(name, arrResolved);
            });
        } else {
            return getUnique(arrResolved.reverse());
        }
    };
    if (!Object.keys(features).length) {
        grunt.fail.fatal('Can"t resolve features: support only cached features, try to run "make:features" command');
    }
    arrFeaturesNames.forEach(function (name) {
        var arrResolved = [];
        recurResolver(name, arrResolved);
        resolved = resolved.concat(arrResolved);
    });
    grunt.log.debug("arrFeaturesNames:");
    grunt.log.debug(JSON.stringify(arrFeaturesNames));
    grunt.log.debug("Array resolved features");
    grunt.log.debug(JSON.stringify(getUnique(resolved)));
    return getUnique(resolved);

};
