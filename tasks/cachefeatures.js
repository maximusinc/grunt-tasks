module.exports = function (grunt){
	/**
     * Cache features after grunt make:features task
     */
    grunt.registerTask('cachefeatures', function () {
        var features = grunt.config('features');
        grunt.file.write('featurecache.json', JSON.stringify(features));
    });
};