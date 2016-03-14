module.exports = function (grunt, path, featureXml2Json){
	var pathModule = require('path');
	var parseScriptItem = require('./parseScriptItem');
	var normalizeFeatureName2Config = require('./normalizeFeatureName2Config');

	var featurePath = pathModule.dirname(path);
	var featureName = normalizeFeatureName2Config(featureXml2Json['feature']['name']);
	var srcList = parseScriptItem(grunt, featurePath, featureXml2Json['feature']['gadget'][0]);
	var uglifyFiles = {};

	srcList.forEach(function (srcFile) {
		var src = [];
		src.push( srcFile );
		uglifyFiles[ srcFile.replace(/\.js$/, '.opt.js') ] = src;
	});

	grunt.log.debug('Uglify config: ' + JSON.stringify(uglifyFiles));
	grunt.config.set('uglify.' + featureName + '.files', uglifyFiles);
	grunt.task.run([ 'uglify:' + featureName ]);

};
