module.exports = function (grunt, path, featureJson) {
	var fs = require('fs');
	var parseScriptItem = require('./parseScriptItem');
    var target = grunt.option('target') || 'dev';
    featureJson = featureJson['feature'];
    var aux = path.split('/'),
        concat = grunt.config('concat'),
        features = grunt.config('features'),
        isES2015 = false,
        needRunTasks = [],
        featurePath,
        dist;
    aux.pop();
    featurePath = aux.join('/');
    aux.push('dist');
    dist = aux.join('/');
    try {
        fs.mkdirSync(dist,'777');
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }

    (['gadget', 'container']).forEach(function (item) {
        if (featureJson['name'] && featureJson['name'].length && featureJson[item] && featureJson[item].length) {
            if (!features[ featureJson['name'] ]) {
                features[ featureJson['name'] ] = [];
            }
            features[ featureJson['name'] ].push( dist + '/' + item + '.js' );
            if (featureJson.babel) {
                var files = {};
                var options = {
                    transform: [ ["babelify", {presets: featureJson.babel}] ],
                    debug: true
                };
                files[ dist + '/' + item + '.js' ] = parseScriptItem(grunt, featurePath, featureJson[item][0]);
                grunt.config.set('browserify.feature_' + item + '.files', files);
                grunt.config.set('browserify.feature_' + item + '.options', options);
                isES2015 = true;
                needRunTasks.push('browserify:feature_' + item);
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
