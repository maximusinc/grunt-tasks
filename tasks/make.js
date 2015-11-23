module.exports = function (grunt){
	'use strict';
	/**
	 * main task
	 * @param  {[type]}
	 * @return {[type]}
	 */
	grunt.registerTask('make', function (target) {
        if (!target) {
            grunt.task.run(['maker:features', 'concat', 'maker:widget']);
        } else if (target === 'features') {
            grunt.task.run(['maker:features', 'concat']);
        } else if (target === 'widget') {
            grunt.task.run(['set-cached-features', 'set-cached-concat', 'maker:widget']);
        }
    });
};
