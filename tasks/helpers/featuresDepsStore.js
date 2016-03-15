/**
 * Created by user on 15.03.2016.
 */

var store = {};
var config = require('./config');
var grunt = require('grunt');

module.exports = {
    push: function (name, deps) {
      store[ name ] = deps;
    },
    getStore: function () {
        return store;
    },
    getCachedStore: function () {
        if (grunt.file.isFile(config.cacheFeaturesDepsPath)) {
            return JSON.parse( grunt.file.read(config.cacheFeaturesDepsPath) );
        } else {
            grunt.log.warn("featuresDepsStore: no " + config.cacheFeaturesDepsPath + " file" );
            return null;
        }
    }
};
