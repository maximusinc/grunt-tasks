module.exports = function (grunt) {
	'use strict';
	grunt.registerTask('clear-target-webapp', function () {
                grunt.file.delete('webapp-dev');
                grunt.file.delete('webapp');
    });
};
