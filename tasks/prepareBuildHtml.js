module.exports = function (grunt) {
    grunt.registerTask('prepareBuildHtml', 'concat and minify style, scripts and inline him, convert images to base64', function (path) {
        var filename,
            distFolder = grunt.config('distFolder'),
            smoosherFiles = {};
        if (grunt.file.isFile(path)) {
            filename = path.split('/').pop().split('.').shift();
            var distHtml = distFolder + '/' + filename + '.html';
            grunt.config('copy.dist.dest', distHtml);
            grunt.config('copy.dist.src', path);
            grunt.config('useminPrepare.html', path);
            grunt.config('usemin.html', distHtml);
            smoosherFiles[distHtml] = distHtml;
            grunt.config('smoosher.all.files', smoosherFiles);
        }
        // grunt.task.run([ 'copy:dist', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'prepareImageEmbed', 'imageEmbed:dist', 'smoosher:all', 'clearDist']);
    });
};