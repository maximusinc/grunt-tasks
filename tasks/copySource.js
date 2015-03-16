module.exports = function (grunt) {
	    /**
     * Copy source files to dist folder
     * Add version to files
     */
    grunt.registerTask('copySource',function () {
        var targetFiles = grunt.config.get('targetFiles') || {},
            makeFileOutputTmp = function (path) {
                var fileName = path.split('/').pop(),
                    aux = fileName.split('.'),
                    ext = aux.pop();
                return aux.join('.') + '-<%= pkg.version %>.' + ext;
            },
            soursePath;
        for ( var prop in targetFiles ) {
            if (targetFiles[prop].length) {
                for ( var index in targetFiles[prop] ) {
                    soursePath = targetFiles[prop][index];
                    grunt.file.copy(soursePath,
                         grunt.config.process( grunt.config.get('distFolder') + prop + '/' + makeFileOutputTmp(soursePath)));
                }
            }
        }
    });
}