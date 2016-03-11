module.exports = function (grunt, distPath){
	var path = require('path');
 	var parseXML = require('node-xml-lite').parseString;
	var featurePath = path.dirname(path.dirname(distPath)),
		featureXmlPath,
		xml,
		docXml;
    featureXmlPath = path.join( featurePath, 'feature.xml');
    xml = grunt.file.read(featureXmlPath);
    return parseXML(xml);
};
