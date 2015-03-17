module.exports = function (grunt){
	var parseXML = require('node-xml-lite').parseString;
	var getUnique = function (arr) {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        // usage example:
        return arr.filter( onlyUnique );
    };
    var readWidgetDeps = function (distPath) {
        var result = [] ,
        docXml,
        getXmlDoc = function (distPath) {
            var aux = distPath.split('/'), featurePath, xml, docXml;
            aux.pop();
            aux.pop();
            aux.push('feature.xml');
            featurePath = aux.join('/');
            xml = grunt.file.read(featurePath);
            return parseXML(xml);
        },
        recursDeps = function (featureName) {
            var features = grunt.config('features'), distPath, docXml;
            if (grunt.file.isFile('featurecache.json')) {
                features = grunt.file.readJSON('featurecache.json');
            }
            if (features[featureName] && features[featureName].length) {
                distPath = features[featureName][0];
                result.push(distPath);
                docXml = getXmlDoc(distPath);
                docXml.childs.forEach(function (child) {
                    if (child.name === 'dependency' && child.childs.length ) {
                        recursDeps(child.childs[0]);
                    }
                });
            }
        };
        result.push(distPath);
        docXml = getXmlDoc(distPath);
        docXml.childs.forEach(function (child) {
            if (child.name === 'dependency' && child.childs.length) {
                recursDeps(child.childs[0]);
            }
        })
        return getUnique(result.reverse());
        // return result;
    }
	grunt.registerTask('resolveFeatures', function (target) {
        target = target ? target : 'gadget';
        var arrFeaturesNames = grunt.config('widget.deps.features') || [],
            arrFeatures = [],
            features = grunt.config('features');
        arrFeaturesNames.forEach(function (featureName) {
            if (features[featureName] && features[featureName].length) {
                features[featureName].forEach(function (path) {

                    if ((new RegExp(target+'.js$').test(path))) {
                        arrFeatures = arrFeatures.concat(readWidgetDeps(path));
                    }
                });
            }
            //grunt.task.run('dependency:show_feature:'+featureName);
        });
        grunt.config('widget.deps.features', getUnique(arrFeatures));
    });
};