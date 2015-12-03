module.exports = function (grunt, params){
	'use strict';
	var locs = grunt.config('widget.deps.locales');
	var features = grunt.config('widget.deps.features');
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
	// xml = xml.replace(/<Locales>[\S\s]*<\/Locales>/g, ''); // clear Locales  - mark
	grunt.file.write(params.toBodyHtml, i18ncript + html );
	grunt.file.write(params.descriptorTo, xml );
};
