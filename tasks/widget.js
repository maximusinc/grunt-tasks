module.exports = function (grunt){
	grunt.registerTask( "widget", "Generate index.html depending on configuration", function() {
        var conf = grunt.config('widget'),
            tmpl = grunt.file.read(conf.src),
            replaceMid = function (body) {
                return body.replace(/__MODULE_ID__/g,conf.mid);
            };

        grunt.file.write(conf.dest, grunt.template.process(tmpl, {data: { body :replaceMid(conf.body), deps : conf.deps, mid : conf.mid }}));

        grunt.log.writeln('Generated \'' + conf.dest + '\' from \'' + conf.src + '\'');
    });
};