module.exports = function (grunt){
    var replacer = require('./helpers/body_replacer');
    var getDefaultTmpl = require('./helpers/getDefaultTmpl');
    var getDefaultConfig = require('./helpers/getDefaultConfig');
    grunt.registerTask( "widget", "Generate <name>.html depending on configuration", function() {
        var conf = grunt.config('widget'),
            widgetConfig = conf.configJson && grunt.file.isFile(conf.configJson) ? grunt.file.read(conf.configJson) : getDefaultConfig(grunt),
            tmpl = conf.src && grunt.file.isFile(conf.src) ? grunt.file.read(conf.src) : getDefaultTmpl(grunt);


        grunt.file.write(conf.dest, grunt.template.process(tmpl, {data: {
            body : replacer(conf.body, conf, widgetConfig),
            config: widgetConfig,
            deps : conf.deps,
            mid : conf.mid,
            localeFilePath: conf.localeFilePath,
            descriptor: grunt.config.get('widgetDescriptor')
        }}));

    var message = 'Generated \'' + conf.dest + '\' from \'' +
                    (conf.src && grunt.file.isFile(conf.src) || 'widget-default.tmpl' ) + '\' using \'' +
                    grunt.config.get('widgetFolder') + grunt.config.get('widgetDescriptor') +
                    ' with ' + (conf.configJson && grunt.file.isFile(conf.configJson) || 'config-default.json');



        grunt.log.writeln(message);
    });
};
