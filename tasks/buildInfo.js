/**
 * Replace @BUILD by build number from Jenkins
 * Build version and sourcePath file get from  buildInfo config
 */
module.exports = function (grunt){
	 grunt.registerTask('buildInfo', 'Replace @BUILD by build number' ,function () {
        var buildInfo = grunt.config('buildInfo'),
        	build = buildInfo && buildInfo.versions && buildInfo.versions[0],
        	sourcePath =  buildInfo && buildInfo.sourcePath,
        	content;
        if (build && sourcePath) {
        	content = grunt.file.read(sourcePath);
        	grunt.file.write(sourcePath, content.replace(/@BUILD/g, build));
        }
    });
};