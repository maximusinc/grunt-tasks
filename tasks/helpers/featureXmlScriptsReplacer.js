module.exports = function (grunt, xmlPath, bundleName){
	var xml2js = require('xml2js');
	var parser = new xml2js.Parser();
	var builder = new xml2js.Builder();

	var aux = xmlPath.split('/');
	var xmlFileName = aux.pop();

	var xml = grunt.file.read( xmlPath );
	grunt.log.debug('Read: ' + xmlPath);
	var newXml = '';

	parser.parseString(xml, function (err, result) {
		var backup = aux.join('/') + '/~' + xmlFileName;
		var newFilename = aux.join('/') + '/' + xmlFileName;
		delete result.feature.babel;
		result.feature.gadget.length = 1;
		result.feature.container.length = 1;
		result.feature.gadget[0].script[0].$.src = bundleName;
		result.feature.container[0].script[0].$.src = bundleName;
		newXml = builder.buildObject(result);
		grunt.file.write( backup , xml );
		grunt.file.write( newFilename , newXml );
		grunt.log.debug('Write backup and new XML content');
	});
};
