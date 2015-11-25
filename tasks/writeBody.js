module.exports = function (grunt){
	'use strict';
	/**
	 * write procced body to config
	 * @param  {[type]}
	 * @return {[type]}
	 */
	grunt.registerTask('writeBody', function (target) {
        var config = require('./helpers/config');
        var bodyHref = grunt.config.get('widget.bodyHref');
        var widgetFolder = grunt.config.get('widgetFolder');
        var widgetDescriptor = grunt.config.get('widgetDescriptor');
        var destPath = grunt.config.get('destPath');
        if (target === 'dev' || target === 'prod') {
        	if (bodyHref) {
        		// has external main.html file
        		grunt.file.copy( destPath + config.body, destPath + bodyHref);
        		grunt.file.copy( widgetFolder + widgetDescriptor, destPath + widgetDescriptor);
        		grunt.file.delete( destPath + config.destTmp );
        	} else {
        		// TODO proccess descriptor body content
        	}
        } else {
        	grunt.config.set('widget.body', grunt.file.read( destPath + config.body ));
        }
    });
};
