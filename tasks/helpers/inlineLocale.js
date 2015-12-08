module.exports = function (grunt, params){
	'use strict';
	var xml2js = require('xml2js');
	var parser = new xml2js.Parser();
	var builder = new xml2js.Builder();

	var config = require('./config');
	var bodyHref = grunt.config.get('widget.bodyHref');
	var destPath = grunt.config.get('destPath');
	var locs = grunt.config('widget.deps.locales');
	var features = grunt.config('widget.deps.features');
	var number = grunt.config('wbuild.number');
	if (!locs) return;
	var oLocs = locs[0];
	var html = grunt.file.read( params.fromBodyHtml );
	var xml = grunt.file.read( params.descriptorFrom );

	var i18ncript = '';
	Object.keys(locs).forEach(function (lKey) {
		i18ncript += '<script type="text/javascript">com.rooxteam.i18n.setLocales(' + JSON.stringify(oLocs) + ', __MODULE_ID__)</script>\n'
	});
	if (features && features.length && features.indexOf('com.rooxteam.i18n') === -1) {
		grunt.fail.warn('Has no com.rooxteam.i18n feature in Require dependencies');
	}
	if (number) {
		parser.parseString(xml, function (err, result) {
			var version = result.Module.ModulePrefs[0].$.version;
			version = version.replace('SNAPSHOT', number);
			result.Module.ModulePrefs[0].$.version = version;
			xml = builder.buildObject(result);
		});
	}
	grunt.file.write(params.toBodyHtml, i18ncript + html );
	grunt.file.copy(params.toBodyHtml, destPath + config.inlineBody );
	grunt.config.set('inline.prod.src', destPath + config.inlineBody);
    grunt.config.set('inline.prod.dest', destPath + bodyHref);
    grunt.task.run(['inline:prod', 'clear-inline-main']);
	grunt.file.write(params.descriptorTo, xml );
};
