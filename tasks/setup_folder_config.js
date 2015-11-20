module.exports = function (grunt) {
	grunt.registerTask('setup_folder_config', function () {
        var xmlFile = grunt.config.get('widgetDescriptor'),
            wPath;
        if (!xmlFile) grunt.fail.fatal('Widget Descriptor must be specified!');
        wPath = xmlFile.split('.').shift();
        if (grunt.file.isFile(xmlFile)) {
            grunt.config.set('widgetFolder', './');
        } else if (grunt.file.isFile('./'+wPath+'/'+xmlFile)) {
            grunt.config.set('widgetFolder', './'+wPath+'/'+xmlFile);
        }
    });
};
