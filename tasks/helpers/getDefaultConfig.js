module.exports = function (grunt, params){
	'use strict';
	return grunt.file.read(__dirname +'/config-default.json');
};
