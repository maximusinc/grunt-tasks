module.exports = function (grunt){
	/**
     * Cache concat features items
     */
    grunt.registerTask('cache_concat', function () {
        var o = grunt.config.get('concat');
        grunt.file.write('.grunt-cache/concat.json', JSON.stringify(o));
    });

};
