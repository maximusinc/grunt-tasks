/**
* Update version property in package.json and bower.json files
*/
module.exports = function (grunt) {
    'use strict';
	grunt.registerTask('updateVersion', 'Update property in package.json and bower.json files', function (patch, minor, major) {
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
                bowerData,
                joinedVersion;
            while(argsLength--){
                if (arguments[argsLength]) {
                  arrVersion[verLength-argsLength] = arguments[argsLength];
                }
            }
            joinedVersion = arrVersion.join('.');
            if (!arguments.length) {
                joinedVersion = joinedVersion.replace(/\D*$/,function () {
                    return '-dev';
                });
            }
            packageData.version = joinedVersion;
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
            // update config package
            grunt.config.set('pkg',packageData);
        };

        /* find version in package json */
	    getVersion();
	    /* update version according console params */
	    updateVersion.apply(null,grunt.util.toArray(arguments));
	});

};