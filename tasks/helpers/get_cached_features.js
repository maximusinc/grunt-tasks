module.exports = function (grunt) {
	var config = require('./config');
	if (grunt.file.isFile(config.cacheFeaturesPath)) {
		return grunt.file.readJSON(config.cacheFeaturesPath);
	}
};
