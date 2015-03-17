module.exports = function (grunt){
	grunt.registerTask('make', function (target) {
        if (!target) {
            grunt.task.run(['maker:features', 'concat', 'maker:widget']);
        } else if (target === 'features') {
            grunt.task.run(['maker:features', 'concat', 'cachefeatures']);
        } else if (target === 'widget') {
            grunt.task.run(['maker:widget']);
        }
    });
};