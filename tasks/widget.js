module.exports = function (grunt){
    var replacer = require('./helpers/body_replacer');
    grunt.registerTask( "widget", "Generate <name>.html depending on configuration", function() {
        var conf = grunt.config('widget'),
            tmpl = grunt.file.read(conf.src);

        grunt.file.write(conf.dest, grunt.template.process(tmpl, {data: {
            body :replacer(conf.body, conf),
            deps : conf.deps,
            mid : conf.mid,
            localeFilePath: conf.localeFilePath,
            descriptor: grunt.config.get('widgetDescriptor')
        }}));

        grunt.log.writeln('Generated \'' + conf.dest + '\' from \'' + conf.src + '\' using \''+ grunt.config.get('widgetFolder') + grunt.config.get('widgetDescriptor'));
    });
};
