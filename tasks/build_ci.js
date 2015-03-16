module.exports = function (grunt) {
	grunt.registerTask('build_ci',function (patch,minor,major) {
    grunt.task.run(['convert:xml2json', 'readFeatureJson']);
    grunt.file.delete( grunt.config.get('distFolder') );
    grunt.file.mkdir( grunt.config.get('distFolder') );
    var version,
        syncProp = ['version'],
        getVersion = function () {
            var packageData = grunt.file.readJSON('package.json');
            if (packageData.version && packageData.version.length) {
                version = packageData.version;
            } else {
                version = '0.0.0';
            }
        },
        updateVersion = function (patch,minor,major) {
            var arrVersion = version ? version.split('.'):[],
                argsLength = arguments.length,
                verLength = arrVersion.length-1,
                packageData = grunt.file.readJSON('package.json'),
                bowerData;
            while(argsLength--){
                if (arguments[argsLength]) {
                  arrVersion[verLength-argsLength] = arguments[argsLength];
                }
            }
            packageData.version = arrVersion.join('.') + (arguments.length?'':'-dev');
            /* sync package.json and bower.json */
            if (grunt.file.exists('bower.json')) {
                bowerData = grunt.file.readJSON('bower.json');
            }
            if (bowerData) {
                for( var i=0; i<syncProp.length;i++ ){
                    bowerData[ syncProp[i] ] = packageData[ syncProp[i] ];
                }
                grunt.file.write('bower.json',JSON.stringify(bowerData, null, 2));
            }
            // save package.json file
            grunt.file.write('package.json',JSON.stringify(packageData, null, 2));
            // update config pa
            grunt.config.set('pkg',packageData);
        },
        /* not used */
        updateFeatureXml = function () {
            var featureData = {},
                pkg = grunt.config.get('pkg');
            if (grunt.file.exists('feature.xml')) {
                grunt.task.run('convert:xml2json');
            }
            if (grunt.file.exists('feature.json')) {
                featureData = grunt.file.readJSON('feature.json');
            }
            for (var i=0; i<syncProp.length;i++) {
                featureData[ syncProp[i] ] = pkg[ syncProp[i] ];
            }
            grunt.file.write('feature.json',JSON.stringify(featureData, null, 2));
            grunt.task.run('convert:json2xml');
        };
    	/* find version in package json */
    	getVersion();
    	/* update version according console params */
    	updateVersion.apply(null,grunt.util.toArray(arguments));
    	// updateFeatureXml();
    	grunt.task.run(['copySource','setUglifyTarget','uglify']);
  	});
}