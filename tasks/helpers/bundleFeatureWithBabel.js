module.exports = function (grunt, path, featureXml2Json) {
	var pathModule = require('path');
	var BUNDLE_NAME = 'main.bundle.js';
	var BUNDLE_NAME_OPT = 'main.bundle.opt.js';
	var files = {};
	var featurePath = pathModule.dirname(path);
	var parseScriptItem = require('./parseScriptItem');
	var featureXmlScriptsReplacer = require('./featureXmlScriptsReplacer');
	var normalizeFeatureName2Config = require('./normalizeFeatureName2Config');
	var featureName = normalizeFeatureName2Config(featureXml2Json['feature']['name']);
	files[ featurePath + pathModule.sep + BUNDLE_NAME ] = parseScriptItem(grunt, featurePath, featureXml2Json['feature']['gadget'][0]);
	grunt.config.set('browserify.' + featureName + '.files', files);
    grunt.config.set('browserify.' + featureName + '.options', {
		transform: [ ["babelify", {presets: featureXml2Json.feature.babel}] ],
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
