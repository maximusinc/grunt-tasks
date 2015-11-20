module.exports = function (grunt){
    var parseString = require('xml2js').parseString;
    var buildWidget = require('./helpers/buildWidget');
    var buildFeature = require('./helpers/buildFeature');
	grunt.registerMultiTask('maker', function (target) {
        grunt.task.current.files.forEach(function (file) {
            var src = file.src,
                srcFiles = grunt.file.expand(src);
            srcFiles.forEach(function(filepath) {
                var xml = grunt.file.read(filepath);
                if(grunt.task.current.target === 'features') {
                    parseString(xml, function (err, result) {
                            buildFeature(grunt, filepath, result);
                    });
                } else if (grunt.task.current.target === 'widget') {
                    buildWidget(grunt, xml);
                    grunt.task.run(['resolveFeatures', 'widget']);
//                    grunt.task.run(['jst']);
                }
            });
        });
        grunt.task.run(['cache_features', 'cache_concat']);
    });
};
