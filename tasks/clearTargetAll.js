module.exports = function (grunt) {
	'use strict';
	grunt.registerTask('clear-target-all', function () {
        grunt.task.run([ 'clear-target-webapp', 'clear-target-webapp-dev' ]);
    });
};
