(function () {
	'use strict';
	var init = function init (grunt) {
		var TASK_FOLDER = __dirname + '/tasks',
	        _ = grunt.util._.extend,
	        // utiltity function -
	        loadConfig = function (path) {
	            var object = {};
	            var key;
	            grunt.file.expand(path + '/*.js').forEach(function (filePath) {
	            	console.info(filePath);
	                var option = filePath.split('/').pop();
	                key = option.replace(/\.js$/, '');
	                object[key] = require(filePath);
	            });
	            return object;
	        };
	    require('load-grunt-tasks')(grunt, {config: __dirname + '/package'});
	    // load tasks from folder
	    if (grunt.file.isDir(TASK_FOLDER)) {
	        grunt.loadTasks(TASK_FOLDER);
	    }
	    return loadConfig( TASK_FOLDER + '/options');
	};

	module.exports = init;
})();