module.exports = function (grunt) {
	'use strict';
	grunt.registerTask('clearDist', function () {
        var concat = grunt.config('concat');
        if (!concat) { return; }
        for (var path in concat) {
            if (grunt.file.isFile(path)) {
                grunt.file.delete(path);
            }
        }
    });
};