module.exports = function (grunt, path, featureXml2Json) {
	var BUNDLE_NAME = 'main.bundle.js';
	var BUNDLE_NAME_OPT = 'main.bundle.opt.js';
	var files = {};
	var aux = path.split('/');
	aux.pop(); // remove feature.xml from path
	var featurePath = aux.join('/');
	var parseScriptItem = require('./parseScriptItem');
	var featureXmlScriptsReplacer = require('./featureXmlScriptsReplacer');
	var normalizeFeatureName2Config = require('./normalizeFeatureName2Config');
	var featureName = normalizeFeatureName2Config(featureXml2Json['feature']['name']);
	files[ featurePath + '/' + BUNDLE_NAME ] = parseScriptItem(grunt, featurePath, featureXml2Json['feature']['gadget'][0]);
	grunt.config.set('browserify.' + featureName + '.files', files);
    grunt.config.set('browserify.' + featureName + '.options', {
		transform: [ ["babelify", {presets: featureXml2Json.feature.babel}] ],
		debug: false
	});
	// uglify config
	var uglifyFiles = {};
	uglifyFiles[ featurePath + '/' + BUNDLE_NAME_OPT ] = Object.keys(files);
	grunt.log.debug('Uglify config: ' + JSON.stringify(uglifyFiles) );
	grunt.config.set('uglify.' + featureName + '.files', uglifyFiles);
	grunt.task.run([ 'browserify:' + featureName, 'uglify:' + featureName ]);
	featureXmlScriptsReplacer(grunt, path, BUNDLE_NAME);
};
