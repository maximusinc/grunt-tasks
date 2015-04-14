'use strict';
module.exports = function (grunt) {
    var buildFilePostfix = '.build-<%= pkg.version %>.js',
        minFilePostfix = '-<%= pkg.version %>.min.js'

    grunt.registerTask('readDependencies', function () {
        var json = grunt.file.readJSON('feature.json'),
            scripts = [],
            srcs = {},
            srcObj,
            concatItem,
            concatOptions = grunt.config.get('concat'),
            ugliflyOptions = grunt.config.get('uglify'),
            uglifyFileName,
            concatProps = [];
        for (var prop in json.feature) {
            if (prop!=='name' && prop!=='dependency') {
                if (!srcs[prop]) {
                    srcs[prop] = [];
                }
                for ( var index in json.feature[prop].script ) {
                    srcObj = json.feature[prop].script[index];
                    srcs[prop].push( grunt.config.get('scriptsFolder') + srcObj.src );
                }
                concatOptions[ prop ] = {
                    src : srcs[prop],
                    dest : grunt.config.get('distFolder') + '/' + prop + buildFilePostfix
                }
                concatProps.push(prop);
            }
        }

        grunt.config.set('concat', concatOptions );
        grunt.log.oklns('set files to concat config option');
        // work with uglify
        ugliflyOptions.target = {};
        ugliflyOptions.target.files = {};
        for ( var index in concatProps) {
            concatItem = concatOptions[ concatProps[index] ];
            uglifyFileName = ( concatItem.dest ).replace(/-(.*)js$/,minFilePostfix);
            ugliflyOptions.target.files[ uglifyFileName ] = [ concatItem.dest ];
        }
        grunt.config.set('uglify', ugliflyOptions );
        grunt.log.oklns('set files to uglify config option');
    });

};