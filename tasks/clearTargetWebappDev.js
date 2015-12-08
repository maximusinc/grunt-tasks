module.exports = function (grunt) {
	'use strict';
	grunt.registerTask('clear-target-webapp-dev', function () {
        grunt.file.delete('webapp-dev');
    });
};
