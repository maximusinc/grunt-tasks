module.exports = function (grunt){
	'use strict';
	/**
	 * write procced body to config
	 * @param  {[type]}
	 * @return {[type]}
	 */
	grunt.registerTask('writeBody', function () {
        var config = require('./helpers/config');
        var destPath = grunt.config.get('destPath');
        grunt.config.set('widget.body', grunt.file.read( destPath + config.body ));
    });
};
