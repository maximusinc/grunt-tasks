module.exports = function (grunt){
	var parseXML = require('node-xml-lite').parseString;
	var parseScriptItem = function (distPath, item) {
        var res = [];
        item['script'] && item['script'].forEach(function (o) {
            if (o && o['$'] && o['$']['src']) {
                res.push(distPath + '/' + o['$']['src']);
            } else {
                grunt.log.error(o);
            }

        });
        return res;
    };

    var buildFeature = function (path, featureJson) {
        featureJson = featureJson['feature'];
        var aux = path.split('/'),
            concat = grunt.config('concat'),
            features = grunt.config('features'),
            featurePath,
            dist;
        aux.pop();
        featurePath = aux.join('/');
        aux.push('dist');
        dist = aux.join('/');
        try {
            fs.mkdirSync(dist,'777');
        } catch(e) {
            if ( e.code != 'EEXIST' ) throw e;
        }
        (['gadget', 'container']).forEach(function (item) {
            if (featureJson['name'] && featureJson['name'].length && featureJson[item] && featureJson[item].length) {
                if (!features[ featureJson['name'] ]) {
                    features[ featureJson['name'] ] = [];
                }
                features[ featureJson['name'] ].push( dist + '/' + item + '.js' );
                concat[ dist + '/' +item ] = {
                    src: parseScriptItem(featurePath, featureJson[item][0]),
                    dest: dist + '/' + item + '.js'
                };
            }
        });
        grunt.config.set('features',features);
        grunt.config.set('concat',concat);
    };

    var buildWidget = function (descriptor) {
        var doc = parseXML(descriptor),
            widgetConfig = grunt.config('widget'),
            widgetBody = grunt.config('widget.body') || '';
        doc.childs.forEach(function (child) {
            if (child.name === 'Content') {
                widgetBody = grunt.config('widget.body');
                grunt.config.set('widget.body', widgetBody + child.childs[0]);
            } else if (child.name === 'ModulePrefs') {
                setWidgetPrefs(child);
            }
        });
        grunt.task.run(['resolveFeatures', 'widget']);
    };

	grunt.registerMultiTask('maker', function (target) {
        grunt.task.current.files.forEach(function (file) {
            var src = file.src,
                srcFiles = grunt.file.expand(src);
            srcFiles.forEach(function(filepath) {
                var xml = grunt.file.read(filepath);
                if(grunt.task.current.target === 'features') {
                    parseString(xml, function (err, result) {
                            buildFeature(filepath, result);
                    });
                } else if (grunt.task.current.target === 'widget') {
                    buildWidget(xml);
                }
            });
        });
    });
};