module.exports = function (grunt) {
	'use strict';
    /**
     * Clear tmp file
     */

	grunt.registerTask('clear-inline-main', function () {
        var config = require('./helpers/config');
        var destPath = grunt.config.get('destPath');
        grunt.file.delete(destPath + config.inlineBody);
    });
};
