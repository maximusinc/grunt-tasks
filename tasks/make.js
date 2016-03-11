module.exports = function (grunt){
	'use strict';
	/**
	 * main task
	 * @param  {[type]}
	 * @return {[type]}
	 */
	grunt.registerTask('make', function (target) {
        if (!target) {
            grunt.task.run(['make:features', 'maker:widget']);
        } else if (target === 'features') {
            grunt.task.run(['maker:features', 'concat', 'cache_concat','cache_features']);
        } else if (target === 'widget') {
            grunt.task.run(['set-cached-features', 'set-cached-concat', 'maker:widget']);
        } else if (target === 'ext_features') {
            grunt.task.run(['maker:ext_features', 'concat']);
        }
    });
};
