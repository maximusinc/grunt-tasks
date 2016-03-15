module.exports = function (grunt){
    var pathModule = require('path');
    var getWidgetInfo = require('./helpers/getWidgetInfo');

    grunt.registerTask('wspa', 'one page widgets rendering', function () {
        var widgets = grunt.config('wspa.widgets'),
            template = grunt.config('wspa.template'),
            widgetsInfo = {};
        Object.keys(widgets).forEach(function(key) {
            widgetsInfo[ key ] = getWidgetInfo(grunt, widgets[key]);
        });

        grunt.file.write( pathModule.join( '.grunt-cache', 'widgetsInfo.json' ), JSON.stringify(widgetsInfo) );
        grunt.log.debug(template);
        grunt.log.debug( JSON.stringify(widgetsInfo) );
    });

};
