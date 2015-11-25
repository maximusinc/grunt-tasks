/**
 * Replace @BUILD by build number from Jenkins
 * Build version and sourcePath file get from  buildInfo config
 */
module.exports = function (grunt){
    var buildWidget = require('./helpers/buildWidget');
	 grunt.registerTask('build', 'build widget' ,function (target) {
        var xml = grunt.file.read( grunt.config.get('widgetFolder') + grunt.config.get('widgetDescriptor') );
        var destConf = grunt.config.get('wbuild.'+target);
        if (target === 'dev') {
        	grunt.config.set('destPath', destConf.dest );
        	grunt.task.run(['copy:make']);
            buildWidget(grunt, xml, target);
            grunt.task.run(['writeBody:'+target]);
        } else if (target === 'prod') {
        	grunt.config.set('destPath', destConf.dest );
        	grunt.task.run(['copy:make']);
            buildWidget(grunt, xml, target);
            grunt.task.run(['writeBody:'+target]);
        }
    });
};
