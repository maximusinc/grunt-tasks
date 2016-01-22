module.exports = function (grunt) {
    grunt.registerTask('prepareBuildFeatures', 'create dist versions of features', function () {
        var xml2js = require('xml2js');
        var parser = new xml2js.Parser();
        var builder = new xml2js.Builder();
        var target = grunt.option('target') || 'dev';



    });
};
