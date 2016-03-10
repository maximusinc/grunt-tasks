module.exports = function (grunt, featureName, result, normalizer) {
	var getXmlDoc = require('./getXmlDoc');
	var features = grunt.config('features'), distPath, docXml;
    if (features[featureName] && features[featureName].length) {
        distPath = features[featureName][0];
        result.push(distPath);
        docXml = getXmlDoc(grunt, normalizer(distPath));
        docXml.childs.forEach(function (child) {
            if (child.name === 'dependency' && child.childs.length ) {
                module.exports(grunt, child.childs[0], result, normalizer);
            }
        });
    }
};
