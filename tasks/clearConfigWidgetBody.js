module.exports = function (grunt) {
	'use strict';
	grunt.registerTask("clearConfigWidgetBody", function () {
        grunt.config.set("widget.body","");
    });
};
