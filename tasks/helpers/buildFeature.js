module.exports = function (grunt, path, featureJson) {
	var fs = require('fs');
    var pathModule = require('path');
	var parseScriptItem = require('./parseScriptItem');
    var target = grunt.option('target') || 'dev';
    var normalizeFeatureName2Config = require('./normalizeFeatureName2Config');
    var featureName = normalizeFeatureName2Config(featureJson['feature']['name']);
    var upPathNormalizer = require('./upPathNormalizer');
    featureJson = featureJson['feature'];
    var upPath = pathModule.dirname(path),
        upCount = upPathNormalizer.getUpCount(path),
        concat = grunt.config('concat'),
        features = grunt.config('features'),
        isES2015 = false,
        needRunTasks = [],
        featurePath,
        dist;
    // aux.unshift('bower_components');
    featurePath = upCount === null ? upPath : upPathNormalizer.makeTmpFromUp( upPath, upCount ) ;
    dist = pathModule.join(featurePath, 'dist');
    grunt.file.mkdir(dist);

    (['gadget', 'container']).forEach(function (item) {
        if (featureJson['name'] && featureJson['name'].length && featureJson[item] && featureJson[item].length) {
            if (!features[ featureJson['name'] ]) {
                features[ featureJson['name'] ] = [];
            }
            features[ featureJson['name'] ].push( dist + pathModule.sep + item + '.js' );
            if (featureJson.babel) {
                var files = {};
                var presets = [];
                featureJson.babel.forEach(function (name) {
                    var m = require('babel-preset-' + name);
                    if (!m) grunt.fail.warn('Preset: '+ name + ' is not supported, check package.json');
                    presets.push( m );
                });
                var options = {
                    transform: [ ["babelify", {presets: presets}] ],
                    debug: true
                };
                files[ dist + pathModule.sep + item + '.js' ] = upPathNormalizer.makeAllUpFromTmp(parseScriptItem(grunt, featurePath, featureJson[item][0]));
                grunt.config.set('browserify.feature_' + featureName + '_' + item + '.files', files);
                grunt.config.set('browserify.feature_' + featureName + '_' + item + '.options', options);
                isES2015 = true;
                needRunTasks.push('browserify:feature_' + featureName + '_' + item);
            } else {
                concat[ dist + pathModule.sep +item ] = {
                    src: upPathNormalizer.makeAllUpFromTmp(parseScriptItem(grunt, featurePath, featureJson[item][0])),
                    dest: dist + pathModule.sep + item + '.js'
                };
            }
        }
    });

    if (isES2015) {
        grunt.task.run(needRunTasks);
    }
    grunt.config.set('features', features);
    grunt.config.set('concat', concat);
};
