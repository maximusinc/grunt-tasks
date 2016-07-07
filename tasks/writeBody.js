module.exports = function (grunt){
	'use strict';
	/**
	 * write procced body to config
	 * @param  {[type]}
	 * @return {[type]}
	 */
	grunt.registerTask('writeBody', function (target) {
        var config = require('./helpers/config');
        var inlineLocale = require('./helpers/inlineLocale');
        //var inlineTemplate = require('./helpers/inlineTemplate');
        var bodyHref = grunt.config.get('widget.bodyHref');
        var widgetFolder = grunt.config.get('widgetFolder');
        var widgetDescriptor = grunt.config.get('widgetDescriptor');
        var destPath = grunt.config.get('destPath');

        if (target === 'dev' || target === 'prod') {
        	if (bodyHref) {
        		// has external main.html file
                if (target === 'prod') {
                    // add locales to href
                    inlineLocale(grunt, {
                        descriptorFrom: widgetFolder + widgetDescriptor,
                        descriptorTo: destPath + widgetDescriptor,
                        fromBodyHtml: destPath + config.body,
                        toBodyHtml: destPath + bodyHref
                    });

                    inlineTemplate(grunt, {
                        descriptorFrom: widgetFolder + widgetDescriptor,
                        descriptorTo: destPath + widgetDescriptor,
                        fromBodyHtml: destPath + config.body,
                        toBodyHtml: destPath + bodyHref
                    });
                    
                } else {
                    // for dev - just copy i18n supported in debug=true mode
                    grunt.file.copy( destPath + config.body, destPath + bodyHref);
                    grunt.file.copy( widgetFolder + widgetDescriptor, destPath + widgetDescriptor);
                }
        		grunt.file.delete( destPath + config.destTmp );
        	} else {
        		// TODO proccess descriptor body content
        	}
        } else {
            var templates = grunt.config('widget.deps.templates');
            var html = '';
            templates.forEach(function (template) {
                html += '<script type="text/javascript">' + template + '</script>\n'
            });
            html += grunt.file.read( destPath + config.body );
            grunt.config.set('widget.body', html);
        }
    });
};