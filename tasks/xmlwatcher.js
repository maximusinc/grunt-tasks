module.exports = function (grunt){
    var buildWidget = require('./helpers/buildWidget');
    grunt.registerTask( "xmlwatcher", "Rebuild widget part", function() {
        var xml = grunt.file.read( grunt.config.get('widgetFolder') + grunt.config.get('widgetDescriptor') );
        grunt.task.run(['set-cached-features', 'set-cached-concat']);
        buildWidget(grunt, xml);
        grunt.task.run(['set-cached-widget-features', 'widget']);
    });
};
