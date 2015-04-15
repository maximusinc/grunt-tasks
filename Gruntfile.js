'use strict';

module.exports = function (grunt) {
    // Show elapsed time at the end
    require('time-grunt')(grunt);
    // Project configuration. Extend predefined
    grunt.initConfig( require('rx-grunt-tasks')(grunt).config , {
        // Metadata.
        pkg: grunt.file.readJSON('package.json')
    }));
};
