module.exropts = function (grunt) {
	'use strict';
	grunt.registerTask('prepareImageEmbed', function () {
        var concat = grunt.config('concat');
        if (!concat) { return; }
        for (var path in concat) {
            if (/.css$/.test(path)) {
                grunt.config('imageEmbed.dist.src', path);
                grunt.config('imageEmbed.dist.dest', path);
            }
        }
    });
};