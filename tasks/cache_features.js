module.exports = function (grunt){
	var config = require('./helpers/config');
	/**
     * Cache features after grunt make:features task
     */
    grunt.registerTask('cache_features', function () {
        var o = grunt.config.get('features');
        if (Object.keys(o).length) {
        	// prevent empty caching
        	grunt.file.write(config.cacheFeaturesPath, JSON.stringify(o));
        }
    });

};
