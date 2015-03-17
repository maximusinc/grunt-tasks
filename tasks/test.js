module.exports = function (grunt){
	/**
     * Run test for features
     * Command like test:com.rooxteam.webapicache
     */
	grunt.registerTask('test', function () {
        var arr = Array.prototype.slice.call(arguments),
            tasks = [];
        if (!arr.length) {
            grunt.log.error('You must specified features to test');
            return;
        }
        arr.forEach(function (featureName) {
            tasks.push('testone:'+featureName);
        });
        tasks.push('concatTestReport');
        grunt.task.run(tasks);
    });
};