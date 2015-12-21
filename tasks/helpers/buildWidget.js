module.exports = function (grunt, descriptor, target) {
    target = target || 'make';
    var config = require('./config');
	var parseXML = require('node-xml-lite').parseString;
    var widgetFolder = grunt.config.get('widgetFolder');
    var destPath = grunt.config.get('destPath');
	var setWidgetPrefs = require('./setWidgetPrefs');
    var doc = parseXML(descriptor),
        widgetConfig = grunt.config('widget');
    doc.childs.forEach(function (child) {
        if (child.name === 'Content') {
            widgetBody = grunt.config('widget.body') || '';
            if (child.attrib && child.attrib.href) {
                grunt.config.set('widget.bodyHref', child.attrib.href);
                 widgetBody += grunt.file.read( widgetFolder + child.attrib.href);
            } else if (child.childs && child.childs[0]) {
                widgetBody += child.childs[0];
            } else {
                grunt.log.errorlns('Widget Has no body, check .xml Content');
            }
            grunt.config('widget.body', widgetBody);
            grunt.file.write( destPath + config.cacheBody, widgetBody );
            grunt.task.run(['processhtml:'+target, 'writeBody']);

        } else if (child.name === 'ModulePrefs') {
            setWidgetPrefs(grunt, child);
        }
    });
};
