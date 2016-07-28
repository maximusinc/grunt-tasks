module.exports = function (grunt, docItem) {
    var widgetConfig = grunt.config('widget'),
        widgetFolder = grunt.config.get('widgetFolder'),
        dustjsFiles = grunt.config.get('dustjs.compile.files'),
        widgetFeatures = widgetConfig.deps.features || [],
        widgetTemplates = widgetConfig.deps.templates || [],
        widgetLocales = widgetConfig.deps.locales || [];
    var dust = require('dustjs-linkedin');

        if (widgetConfig.wrsDefaults && widgetConfig.wrsDefaults.length) {
            widgetFeatures = widgetFeatures.concat(widgetConfig.wrsDefaults);
        }
    docItem.childs.forEach(function (child) {
        // skip text nodes
        if (typeof child != "object") return;

        if (child.name === 'Require') {
            widgetFeatures.push(child.attrib.feature);
        } else if (child.name === 'Templates') {
            var templates = {};

            var nameWithModuleId = function nameWithModuleId(name, moduleId){
                var separator = "::";
                if (moduleId != null && typeof moduleId.toString === "function"){
                    return  moduleId.toString() + separator + name;
                } else {
                    return  name;
                }
            };
            dust.makeAlias = function(templateName, aliasName){
                if(dust.cache[templateName] && templateName !== aliasName){
                    dust.cache[aliasName] = dust.cache[templateName];
                }
            }
            //only if we are in full version
            if (typeof dust !== "undefined" && dust.compile) {
                var dustCompileOrig = dust.compile;
                dust.compile = function(source, name, moduleId){
                    if(moduleId){
                        //Compile both versions
                        return dustCompileOrig(source, nameWithModuleId(name, moduleId)) + " dust.makeAlias('"+nameWithModuleId(name, moduleId)+"', '"+name+"');";
                    } else {
                        return dustCompileOrig(source, name);
                    }
                }
            }

            child.childs.forEach(function (child) {
                // skip text nodes
                if (typeof child != "object") return;

                var conf = grunt.config('widget');
                var fileContent = grunt.file.read( widgetFolder + child.attrib['src']);
                var compiled = dust.compile(fileContent, child.attrib['name'], conf.mid)
                widgetTemplates.push(compiled);
            });
        } else if (child.name === 'Locales' && child.childs.length && !Object.keys(widgetLocales).length) {
            var locales = {};
            child.childs.forEach(function (child) {
                // skip text nodes
                if (typeof child != "object") return;

                locales[child.attrib['lang']] = grunt.file.readJSON( widgetFolder + child.attrib['messages']);
            });
            widgetLocales.push(locales);
        }
    });

    grunt.config.set('widget.deps.features', widgetFeatures);
    grunt.config.set('widget.deps.templates', widgetTemplates);
    grunt.config.set('widget.deps.locales', widgetLocales);
};