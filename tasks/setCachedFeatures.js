module.exports = function (grunt) {
	var config = require('./helpers/config');
	grunt.registerTask('set-cached-features', function () {
		if (grunt.file.isFile(config.cacheFeaturesPath)) {
			var data = grunt.file.readJSON(config.cacheFeaturesPath);
		} else {
			grunt.fail.fatal('Can"t resolve cached features');
		}
	    grunt.config.set('features', data);
  	});
}
