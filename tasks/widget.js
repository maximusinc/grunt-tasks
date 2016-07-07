module.exports = function (grunt){
    var replacer = require('./helpers/body_replacer');
    var getDefaultTmpl = require('./helpers/getDefaultTmpl');
    var getDefaultConfig = require('./helpers/getDefaultConfig');
    grunt.registerTask( "widget", "Generate <name>.html depending on configuration", function() {
        var conf = grunt.config('widget'),
            widgetConfig = conf.configJson && grunt.file.isFile(conf.configJson) ? grunt.file.read(conf.configJson) : getDefaultConfig(grunt),
            tmpl = conf.src && grunt.file.isFile(conf.src) ? grunt.file.read(conf.src) : getDefaultTmpl(grunt);
			
		var urlString = "";
		
		if (typeof grunt.config.get('urlParams') != 'undefined') {
			var connect = grunt.config.get('connect');
			var widgetHost = connect.server.options.hostname;
			var widgetPort = connect.server.options.port;
			var widgetFolder = grunt.config.get('widgetFolder');
			var urlParams = grunt.config.get('urlParams');
			var urlParamsArr = [];
			for (var par in urlParams) {
				if ( (urlParams[par] == null) && (typeof conf[par] != 'undefined') ) {
					urlParamsArr.push(par+"="+conf[par]);
				} else {
					urlParamsArr.push(par+"="+urlParams[par]);
				}
			}
		
			urlString = "?" + urlParamsArr.join('&');
		}
		
        grunt.file.write(conf.dest, grunt.template.process(tmpl, {data: {
            body : replacer(conf.body, conf, widgetConfig),
            config: widgetConfig,
            deps : conf.deps,
            mid : conf.mid,
			urlString: urlString,
			wFolder: "http://" + widgetHost + ":" + widgetPort + "/" + widgetFolder,
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