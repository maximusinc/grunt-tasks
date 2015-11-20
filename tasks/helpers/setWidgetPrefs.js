module.exports = function (grunt, docItem) {
    var widgetConfig = grunt.config('widget'),
        dustjsFiles = grunt.config.get('dustjs.compile.files'),
        widgetFeatures = widgetConfig.deps.features || [],
        widgetTemplates = widgetConfig.deps.templates || [],
        widgetLocales = widgetConfig.deps.locales || [];
        if (widgetConfig.wrsDefaults && widgetConfig.wrsDefaults.length) {
            widgetFeatures = widgetFeatures.concat(widgetConfig.wrsDefaults);
        }
    docItem.childs.forEach(function (child) {
        if (child.name === 'Require') {
            widgetFeatures.push(child.attrib.feature);
        } else if (child.name === 'Templates') {
            grunt.task.run(['dust']);
            for(var f in dustjsFiles) {
                widgetTemplates.push(f);
            }
        } else if (child.name === 'Locales' && child.childs.length) {
            var locales = {};
            child.childs.forEach(function (child) {
                locales[child.attrib['lang']] = grunt.file.readJSON(child.attrib['messages']);
            });
            widgetLocales.push(locales);
        }
    });

    grunt.config.set('widget.deps.features', widgetFeatures);
    grunt.config.set('widget.deps.templates', widgetTemplates);
    grunt.config.set('widget.deps.locales', widgetLocales);
};
