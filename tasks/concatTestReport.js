module.exports = function (grunt){
    var xmlbuilder = require('xmlbuilder');
    var parseXML = require('node-xml-lite').parseString;
	 /**
     * Search all test-results for features and concat info
     */
	grunt.registerTask('concatTestReport', function () {
        var testResults = xmlbuilder.create('testsuites'),
            registerChilds = function (item, registerTo) {
                registerTo = registerTo || testResults;
                if (item && item.childs && item.childs.length) {
                    item.childs.forEach(function (child) {
                        if (child.name) {
                            var elem = registerTo.ele(child.name, child.attrib || {});
                        }
                        registerChilds(child, elem);
                    });
                }
            };
        grunt.file.expand('test/*-test-results.xml').forEach(function (path) {
            var xmlStr = grunt.file.read(path),
                docXml = parseXML(xmlStr);
            registerChilds(docXml);
           grunt.file.delete(path);
        });
        grunt.file.write('test/test-results.xml', testResults.end({ pretty: true}));
    });
};