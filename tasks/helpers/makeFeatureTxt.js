module.exports = function (grunt, srcFiles, pathLevel) {
	var pathModule = require('path');
	var txtFilePath = null;
	var pathSeparator = '/'; // important! use unix separator
	var content = [];
	srcFiles.forEach(function (filepath) {
		var aux = filepath.split(pathSeparator);
		if (txtFilePath === null) {
			txtFilePath = aux.slice(0, pathLevel).join(pathSeparator);
		}
		content.push( aux.slice(pathLevel).join(pathSeparator) );
	} );
	grunt.file.write(txtFilePath + pathSeparator + 'features.txt', content.join('\r\n') );
};
