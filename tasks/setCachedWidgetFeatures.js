module.exports = function (grunt) {
	var config = require('./helpers/config');
	grunt.registerTask('set-cached-widget-features', function () {
		if (grunt.file.isFile(config.cacheWidgetFeaturesPath)) {
			var data = grunt.file.readJSON(config.cacheWidgetFeaturesPath);
		} else {
			grunt.fail.fatal('Can"t resolve cached features');
		}
	    grunt.config.set('widget.deps.features', data);
  	});
}
