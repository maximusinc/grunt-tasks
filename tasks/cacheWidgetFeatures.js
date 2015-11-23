module.exports = function (grunt){
	var config = require('./helpers/config');
	/**
     * Cache features after grunt make:features task
     */
    grunt.registerTask('cache_widget_features', function () {
        var o = grunt.config.get('widget.deps.features');
        if (Object.keys(o).length) {
        	// prevent empty caching
        	grunt.file.write(config.cacheWidgetFeaturesPath, JSON.stringify(o));
        }
    });

};
