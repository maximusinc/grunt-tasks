module.exports = function (grunt){

    var cacheWidgetInfo = require('./helpers/cacheWidgetInfo');
    var bodyReplacer = require('./helpers/body_replacer');
    var featuresResolver = require('./helpers/featuresResolver');
    var buildScriptsHtml = require('./helpers/buildScriptsHtml');

    grunt.registerTask('wspa', 'one page widgets rendering', function () {
        var widgets = grunt.config('wspa.widgets'),
            template = grunt.config('wspa.template'),
            wspaDest = grunt.config('wspa.dest'),
            widgetsInfo = cacheWidgetInfo(widgets, grunt),
            arrAllWidgetsFeatures = [],
            arrResolverFeatures,
            tmpData = {},
            counter = 0;
        for(var alias in widgetsInfo) {
            arrAllWidgetsFeatures = arrAllWidgetsFeatures.concat( widgetsInfo[ alias].features );
            tmpData[ alias ] = bodyReplacer(widgetsInfo[alias].widgetBody, {
                mid: (widgetsInfo[alias].mid || counter)
            } );
            counter += 1;
        }
        arrResolverFeatures = featuresResolver(arrAllWidgetsFeatures);
        tmpData['featuresSrc'] = buildScriptsHtml(arrResolverFeatures);
        grunt.log.debug(arrResolverFeatures);
        grunt.file.write( wspaDest, grunt.template.process( grunt.file.read(template), {
            data: tmpData
        } ) );
        grunt.log.debug(JSON.stringify(tmpData));
    });

};
