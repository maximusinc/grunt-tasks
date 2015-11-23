module.exports = function (grunt) {
	var config = require('./helpers/config');
	grunt.registerTask('set-cached-concat', function () {
		if (grunt.file.isFile(config.cacheConcatPath)) {
			var data = grunt.file.readJSON(config.cacheConcatPath);
		} else {
			grunt.fail.fatal('Can"t resolve cached concat');
		}
	    grunt.config.set('concat', data);
  	});
}
