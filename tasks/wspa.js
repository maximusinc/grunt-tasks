module.exports = function (grunt){

    var pathModule = require('path');
    var cacheWidgetInfo = require('./helpers/cacheWidgetInfo');
    var bodyReplacer = require('./helpers/body_replacer');
    var featuresResolver = require('./helpers/featuresResolver');
    var buildScriptsHtml = require('./helpers/buildScriptsHtml');
    var processWidgetBody = require('./helpers/processWidgetBody');
    var getDefaultConfig = require('./helpers/getDefaultConfig');
    var widgetsGlobalBaseUrlManager = require('./helpers/wspa/widgetsGlobalBaseUrlManager');
    var setupWSPAWatchers = require('./helpers/wspa/setupWSPAWatchers');
    var extendWSPAConfig = require('./helpers/wspa/extendConfig');

    grunt.registerTask('wspa', 'one page widgets rendering', function () {
        var widgets = grunt.config('wspa.widgets'),
            template = grunt.config('wspa.template'),
            wspaDest = grunt.config('wspa.dest'),
            destPath = grunt.config.get('destPath'),
            wspaConfigFile = grunt.config('wspa.config'),
            partialWspaConfig = grunt.config('wspa.partialConfig'),
            widgetsInfo = cacheWidgetInfo(widgets, grunt),
            arrAllWidgetsFeatures = grunt.config('wspa.wrsDefaults') || [],
            arrResolverFeatures,
            tmpData = {},
            counter = 0,
            wspaConfig = getDefaultConfig(grunt);

        if (wspaConfigFile && grunt.file.isFile(wspaConfigFile)) {
            wspaConfig = grunt.file.read(wspaConfigFile);
        }
        if ( typeof partialWspaConfig === 'string' && grunt.file.isFile(partialWspaConfig) ) {
            wspaConfig = extendWSPAConfig(wspaConfig, grunt.file.read( partialWspaConfig ) );
        } else if ( typeof partialWspaConfig !== 'undefined' && partialWspaConfig ) {
            wspaConfig = extendWSPAConfig(wspaConfig, partialWspaConfig);
        }

        for(var alias in widgetsInfo) {
            grunt.log.debug("widgetsInfo:");
            grunt.log.debug(JSON.stringify(widgetsInfo));
            var curMid = (widgetsInfo[alias].mid || counter),
                processOptions = {
                    base: destPath + alias + '/',
                    widgetFolder: pathModule.dirname( widgetsInfo[alias].descriptor ),
                    alias: alias
                },
                processParams = {
                    locales: widgetsInfo[ alias].locales,
                    mid: curMid
                };
            widgetsGlobalBaseUrlManager.add({
                mid: curMid,
                descriptor: widgetsInfo[alias].descriptor,
                params: widgetsInfo[alias].params
            });
            grunt.log.debug("PARAMS", widgetsInfo[alias].params);
            arrAllWidgetsFeatures = arrAllWidgetsFeatures.concat( widgetsInfo[ alias].features );
            tmpData[ alias ] = processWidgetBody(bodyReplacer(widgetsInfo[alias].widgetBody, {
                mid: curMid
            }, wspaConfig), processOptions, processParams);
            counter += 1;
            setupWSPAWatchers(processOptions); // setup watch config
        }
        arrResolverFeatures = featuresResolver(arrAllWidgetsFeatures);

        tmpData['featuresSrc'] = widgetsGlobalBaseUrlManager.buildScript() + buildScriptsHtml(arrResolverFeatures,null, null, wspaConfig);
        tmpData['wspaConfig'] = wspaConfig;
        grunt.log.debug(arrResolverFeatures);
        grunt.file.write( wspaDest, grunt.template.process( grunt.file.read(template), {
            data: tmpData
        } ) );
        grunt.log.debug( "Generated watch config:" );
        grunt.log.debug( JSON.stringify( grunt.config('watch') ) );
    });

};
