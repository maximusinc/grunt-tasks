module.exports = function (grunt, path, featureJson) {
	var fs = require('fs');
	var parseScriptItem = require('./parseScriptItem');
    var target = grunt.option('target') || 'dev';
    var normalizeFeatureName2Config = require('./normalizeFeatureName2Config');
    var featureName = normalizeFeatureName2Config(featureJson['feature']['name']);
    featureJson = featureJson['feature'];
    var aux = path.split('/'),
        concat = grunt.config('concat'),
        features = grunt.config('features'),
        isES2015 = false,
        needRunTasks = [],
        aux2 = [],
        featurePath,
        dist;
    aux.pop();
    aux.forEach(function (str) {
        if (str !== '..') {
            aux2.push(str);
        } else {
            aux2.push('.tmp');
        }
    });
    // aux.unshift('bower_components');
    featurePath = aux2.join('/');
    aux2.push('dist');
    dist = aux2.join('/');
    grunt.file.mkdir(dist);

    (['gadget', 'container']).forEach(function (item) {
        if (featureJson['name'] && featureJson['name'].length && featureJson[item] && featureJson[item].length) {
            if (!features[ featureJson['name'] ]) {
                features[ featureJson['name'] ] = [];
            }
            features[ featureJson['name'] ].push( dist + '/' + item + '.js' );
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
                files[ dist + '/' + item + '.js' ] = parseScriptItem(grunt, featurePath, featureJson[item][0]);
                grunt.config.set('browserify.feature_' + featureName + '_' + item + '.files', files);
                grunt.config.set('browserify.feature_' + featureName + '_' + item + '.options', options);
                isES2015 = true;
                needRunTasks.push('browserify:feature_' + featureName + '_' + item);
            } else {
                concat[ dist + '/' +item ] = {
                    src: parseScriptItem(grunt, featurePath, featureJson[item][0]),
                    dest: dist + '/' + item + '.js'
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
