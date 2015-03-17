module.exports = function (grunt){
    /**
     * Try search hack files for feature
     * @param  {String} featureName - feature to lookup hacks scripts
     * @return {Array|Undefined} - files or undefined
     */
    var serchHackFiles = function (featureName) {
        var hackListPath = 'test/spec-utils/hacks/list.json';
        if (!grunt.file.isFile(hackListPath)) return;
        var hacks = grunt.file.readJSON(hackListPath);
        console.log(featureName);
        if(!hacks[featureName] || !hacks[featureName].length) return;
        return hacks[featureName];
    };

    var readWidgetDeps = function (distPath) {
        var result = [] ,
        docXml,
        getXmlDoc = function (distPath) {
            var aux = distPath.split('/'), featurePath, xml, docXml;
            aux.pop();
            aux.pop();
            aux.push('feature.xml');
            featurePath = aux.join('/');
            xml = grunt.file.read(featurePath);
            return parseXML(xml);
        },
        recursDeps = function (featureName) {
            var features = grunt.config('features'), distPath, docXml;
            if (grunt.file.isFile('featurecache.json')) {
                features = grunt.file.readJSON('featurecache.json');
            }
            if (features[featureName] && features[featureName].length) {
                distPath = features[featureName][0];
                result.push(distPath);
                docXml = getXmlDoc(distPath);
                docXml.childs.forEach(function (child) {
                    if (child.name === 'dependency' && child.childs.length ) {
                        recursDeps(child.childs[0]);
                    }
                });
            }
        };
        result.push(distPath);
        docXml = getXmlDoc(distPath);
        docXml.childs.forEach(function (child) {
            if (child.name === 'dependency' && child.childs.length) {
                recursDeps(child.childs[0]);
            }
        })
        return getUnique(result.reverse());
        // return result;
    };

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