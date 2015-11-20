module.exports = function (grunt){
	/**
     * Cache features after grunt make:features task
     */
    grunt.registerTask('cache_features', function () {
        var o = grunt.config.get('features');
        grunt.file.write('.grunt-cache/features.json', JSON.stringify(o));
    });

};
