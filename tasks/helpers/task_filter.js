module.exports = function (grunt) {
	var  _ = grunt.util._,
		taskFallbacks = function (taskName) {
			grunt.log.error(' Task `' + taskName + '` does not exist!');
		};
	return {
		filterAvailableTasks: function (tasks) {
			tasks = tasks.map(function(taskName) {
			    // Maps to task name or fallback if task is unavailable

			    var baseName = taskName.split(':')[0]; // e.g. 'coffee' for 'coffee:compile'
			    var isAvailable = grunt.task.exists(baseName);
			    return isAvailable ? taskName : taskFallbacks[taskName];
			});
		}
	};
}
