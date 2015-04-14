module.exports = function (grunt) {
	'use strict';
    grunt.registerTask('clearDistfolder', ' Delete distFolder ', function () {
        grunt.file.delete( grunt.config.get('distFolder') );
        grunt.file.mkdir( grunt.config.get('distFolder') );
    });

};