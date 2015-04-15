module.exports = function (grunt) {
	grunt.registerTask('bower_install', function () {
		var bw = require('rx-bower-upload');
		bw();
	});
};