module.exports = function (grunt) {
	grunt.registerTask('setUglifyTarget', function () {
	    var uglifyOption = grunt.config.get('uglify'),
	        arr = grunt.file.expandMapping('**/*.js', grunt.config.get('distFolder') ,{
	            cwd: grunt.config.get('distFolder'),
	            ext: '.min.js',
	            extDot: 'last'
	        });
	    for (var i in arr){
	        uglifyOption.target.files[ arr[i].dest ] = arr[i].src;
	    }
	    grunt.config.set('uglify',uglifyOption);
  	});
}