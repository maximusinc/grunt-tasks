module.exports = function (grunt, distPath){
	var parseXML = require('node-xml-lite').parseString;
	var aux = distPath.split('/'), featurePath, xml, docXml;
    aux.pop();
    aux.pop();
    aux.push('feature.xml');
    featurePath = aux.join('/');
    xml = grunt.file.read(featurePath);
    return parseXML(xml);
};
