'use strict';
module.exports = function (grunt) {

    grunt.config.set('gittag',{
        version: {
            options: {
                tag: 'v<%= pkg.version %>',
                message: 'build version <%= pkg.version %>'
            }
        }
    });

    grunt.config.set('gitpush',{
        version: {
            options: {
                remote: 'origin',
                branch: 'master',
                tags: true
            }
        }
    });

    grunt.registerTask('commitBuildVersion', function () {
        grunt.task.run(['gittag:version', 'gitpush:version']);
    });

};