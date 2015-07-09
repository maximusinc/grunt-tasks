
module.exports = function (grunt) {
	grunt.registerTask('bower_install', function () {
		var done = this.async();
        grunt.util.spawn({
            cmd: 'node',
            args: ['node_modules/rx-bower-upload/execute.js'],
        }, function (error, result, code) {
            error && grunt.log.error(error);
            grunt.log.debug(result.stdout);
            done();
        });
	});
};
