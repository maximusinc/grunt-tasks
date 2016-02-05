module.exports = function(grunt) {
    grunt.registerTask('bwupload', 'install frontend dependencies', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('bower install', function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('bwinstall', ['bwupload']);

    grunt.registerTask('bwunjar', 'unjar dependencies installed by bower', function () {
    	var exec = require('child_process').exec;
        var cb = this.async();
        exec('node ./node_modules/rx-bower-unjar/index.js', function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
    });
};
