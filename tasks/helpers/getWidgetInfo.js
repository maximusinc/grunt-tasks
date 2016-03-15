module.exports = function (grunt, xmlDescriptorPath) {
    var info = {
        widgetBody: ''
    };
    var pathModule = require('path');
    var config = require('./config');
    var getWidgetPrefs = require('./getWidgetPrefs');
    var parseXML = require('node-xml-lite').parseString;
    var widgetFolder = pathModule.dirname(xmlDescriptorPath) + pathModule.sep;
    var destPath = grunt.config.get('destPath');
    var setWidgetPrefs = require('./setWidgetPrefs');
    var doc = parseXML( grunt.file.read(xmlDescriptorPath) );
    doc.childs.forEach(function (child) {
        if (child.name === 'Content') {
            if (child.attrib && child.attrib.href) {
                info.widgetBody += grunt.file.read( widgetFolder + child.attrib.href);
            } else if (child.childs && child.childs[0]) {
                info.widgetBody += child.childs[0];
            } else {
                grunt.log.errorlns('Widget Has no body, check .xml Content');
            }
        } else if (child.name === 'ModulePrefs') {
            var prefs = getWidgetPrefs(grunt, child, widgetFolder );
            Object.keys(prefs).forEach(function(key) {
                info[ key ] = prefs[ key ];
            });
        }
    });
    return info;
};
