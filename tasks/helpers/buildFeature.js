module.exports = function (grunt, path, featureJson) {
	var fs = require('fs');
	var parseScriptItem = require('./parseScriptItem');
    featureJson = featureJson['feature'];
    var aux = path.split('/'),
        concat = grunt.config('concat'),
        features = grunt.config('features'),
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
            concat[ dist + '/' +item ] = {
                src: parseScriptItem(grunt, featurePath, featureJson[item][0]),
                dest: dist + '/' + item + '.js'
            };
        }
    });
    grunt.config.set('features', features);
    grunt.config.set('concat', concat);
};
