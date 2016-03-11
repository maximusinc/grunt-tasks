module.exports = function (grunt){
    var parseString = require('xml2js').parseString;
    var buildWidget = require('./helpers/buildWidget');
    var buildFeature = require('./helpers/buildFeature');
	grunt.registerMultiTask('maker', function (target) {
        target = target || grunt.task.current.target;
        var beforeMakerTasks = grunt.config.get('beforeMakerTasks.'+ target) || [];
        var afterMakerTasks = grunt.config.get('afterMakerTasks.'+ target) || [];
        grunt.task.run(beforeMakerTasks);
        grunt.task.current.files.forEach(function (file) {
            var src = file.src,
                srcFiles = grunt.file.expand(src);
            srcFiles.forEach(function(filepath) {
                var xml = grunt.file.read(filepath);
                if(grunt.task.current.target === 'features' || grunt.task.current.target === 'ext_features' ) {
                    parseString(xml, function (err, result) {
                            buildFeature(grunt, filepath, result);
                    });
                } else if (grunt.task.current.target === 'widget') {
                    buildWidget(grunt, xml);
                    grunt.task.run(['resolveFeatures', 'widget']);
                }
            });
        });
        grunt.task.run(afterMakerTasks);
    });
};
