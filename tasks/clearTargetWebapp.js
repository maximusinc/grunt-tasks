module.exports = function (grunt) {
	'use strict';
	grunt.registerTask('clear-target-webapp', function () {
        grunt.file.delete('webapp');
    });
};
