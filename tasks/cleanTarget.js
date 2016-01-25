module.exports = function (grunt) {
	'use strict';
	grunt.registerTask('cleanTarget', function () {
        grunt.file.delete('target');
    });
};
