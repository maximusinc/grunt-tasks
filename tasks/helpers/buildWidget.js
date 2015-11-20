module.exports = function (grunt, descriptor) {
	var parseXML = require('node-xml-lite').parseString;
	var setWidgetPrefs = require('./setWidgetPrefs');
    var doc = parseXML(descriptor),
        widgetConfig = grunt.config('widget'),
        widgetBody = grunt.config('widget.body') || '';
    doc.childs.forEach(function (child) {
        if (child.name === 'Content') {
            widgetBody = grunt.config('widget.body') || '';
            grunt.config.set('widget.body', widgetBody + child.childs[0]);
        } else if (child.name === 'ModulePrefs') {
            setWidgetPrefs(grunt, child);
        }
    });
};
