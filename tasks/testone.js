module.exports = function (grunt){
	/**
     * Test one feature
     * Search feature path
     * @param  {String} featureName - name feature to test
     * @param  {String} buildTarget - optional, build to test gadget|container - default is gadget
     */
    grunt.registerTask('testone', function (featureName, buildTarget) {
        buildTarget = buildTarget || 'gadget';
        if (!featureName) {
            grunt.log.error('You must specified feature name');
            return;
        }
        if (!grunt.file.isFile('featurecache.json')) {
            grunt.log.error('before this command need to run make:features command');
            return;
        }
        var features = grunt.file.readJSON('featurecache.json'),
            testFeatureBuilds = features[featureName],
            buildRegExp = new RegExp(buildTarget+'.js$'),
            includes = serchHackFiles(featureName) || [];
        if (!testFeatureBuilds || !testFeatureBuilds.length) {
            grunt.log.error('Specified feature not found in feature list');
            return;
        }
        if (grunt.file.isDir('test/'+ featureName)) {
            testFeatureBuilds.forEach(function (item) {
                if (buildRegExp.test(item)) {
                    var aux = readWidgetDeps(item);
                    aux.forEach(function (path) {
                        includes.push('../' + path);
                    });
                }
            });

            includes.push(featureName + '/*.js');
            grunt.config('karma.unit.options.files', includes);
            grunt.config('karma.unit.options.junitReporter', {
                outputFile: featureName+'-test-results.xml',
                suite: ''
            });
            grunt.task.run('karma');
        } else {
            grunt.log.writeln('feature ' + featureName + ' does not contains test specs');
        }
    });
};