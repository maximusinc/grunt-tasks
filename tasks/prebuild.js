module.exports = function (grunt) {
    'use strict';
	var parseString = require('xml2js').parseString;
    var bundleFeatureWithBabel = require('./helpers/bundleFeatureWithBabel');
	var runUglifyForOptFile = require('./helpers/runUglifyForOptFile');
    grunt.registerMultiTask('prebuild', 'alias for jscs and karma tasks', function (target) {
    	if (grunt.task.current.target === 'features') {
    		grunt.task.current.files.forEach(function (file) {
	            var src = file.src,
	                srcFiles = grunt.file.expand(src);
	            srcFiles.forEach(function(filepath) {
	            	grunt.log.debug('read ' + filepath);
	                var xml = grunt.file.read(filepath);
                    parseString(xml, function (err, result) {
                    	if ( result && result.feature && result.feature.babel) {
                            // create bundle
                    		bundleFeatureWithBabel(grunt, filepath, result);
                    	} else {
                            // uglify and add .opt extension
                            runUglifyForOptFile(grunt, filepath, result);
                        }
                    });
	            });
	        });
    	} else {
    		grunt.task.run(['jscs', 'karma']);
    	}
    });
};
