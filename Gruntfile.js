'use strict';

module.exports = function (grunt) {
    var _ = grunt.util._.extend,
        // utiltity function -
        loadConfig = function (path) {
            var object = {};
            var key;
            grunt.file.expand(path + '/*.js').forEach(function(filePath) {
                var option = filePath.split('/').pop();
                key = option.replace(/\.js$/,'');
                object[key] = require('./' + filePath);
            });
            return object;
        };
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time at the end
    require('time-grunt')(grunt);
    // load tasks from folder
    grunt.loadTasks('tasks');

    // Project configuration. Extend predefined
    grunt.initConfig(_(loadConfig('tasks/options'), {
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                    livereload: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            target: {
                files: ['index.html', 'styles/**/*.css', 'scripts/**/*.js']
            }
        }
    }));

  // Default task.
  grunt.registerTask('default', ['connect', 'watch']);

    grunt.registerTask('hello', function () {
        grunt.task.run('example');
    });
};
