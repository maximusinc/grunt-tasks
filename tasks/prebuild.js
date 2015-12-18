module.exports = function (grunt) {
    'use strict';
    grunt.registerTask('prebuild', 'alias for jscs and karma tasks', function () {
        grunt.task.run(['jscs', 'karma']);
    });
};
