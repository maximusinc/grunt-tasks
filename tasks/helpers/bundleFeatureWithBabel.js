module.exports = function (grunt, path, featureXml2Json) {
	var pathModule = require('path');
	var css2radium = require('./react/css2radium');
	var BUNDLE_NAME = 'main.bundle.js';
	var BUNDLE_NAME_OPT = 'main.bundle.opt.js';
	var files = {};
	var featurePath = pathModule.dirname(path);
	var parseScriptItem = require('./parseScriptItem');
	var featureXmlScriptsReplacer = require('./featureXmlScriptsReplacer');
	var normalizeFeatureName2Config = require('./normalizeFeatureName2Config');
	var featureName = normalizeFeatureName2Config(featureXml2Json['feature']['name']);
	var presets = [];
	featureXml2Json.feature.babel.forEach(function (name) {
		var m = require('babel-preset-' + name);
		if (!m) grunt.fail.warn('Preset: '+ name + ' is not supported, check package.json');
		presets.push( m );
	});
	if (presets.indexOf('react')) {
		css2radium(path, featureXml2Json.feature);
	}
	files[ featurePath + pathModule.sep + BUNDLE_NAME ] = parseScriptItem(grunt, featurePath, featureXml2Json['feature']['gadget'][0]);
	grunt.config.set('browserify.' + featureName + '.files', files);
    grunt.config.set('browserify.' + featureName + '.options', {
		transform: [ ["babelify", {presets: presets}] ],
		debug: false
	});
	// uglify config
	var uglifyFiles = {};
	uglifyFiles[ featurePath + pathModule.sep + BUNDLE_NAME_OPT ] = Object.keys(files);
	grunt.log.debug('Uglify config: ' + JSON.stringify(uglifyFiles) );
	grunt.config.set('uglify.' + featureName + '.files', uglifyFiles);
	grunt.task.run([ 'browserify:' + featureName, 'uglify:' + featureName ]);
	featureXmlScriptsReplacer(grunt, path, BUNDLE_NAME);
};
