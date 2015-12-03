module.exports = function (grunt) {
	'use strict';
	grunt.registerTask('clearConfigLocales', function () {
       grunt.config.set('widget.deps.locales', null);
    });
};
