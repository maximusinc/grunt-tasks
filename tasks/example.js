module.exports = function(grunt) {
  	grunt.registerTask('example', 'Say hello!', function() {
  		var config = grunt.config('example');
    	grunt.log.writeln("Hello world!");
    	console.log(config);
    	grunt.task.run('test');
  	});
};