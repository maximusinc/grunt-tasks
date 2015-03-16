module.exports = function (grunt){
	 /**
     * Add targetFiles property to grunt config
     * For files using feature.xml file
     */
    grunt.registerTask('readFeatureJson',function () {
        if (!grunt.file.exists('feature.json')) {
            grunt.fail.fatal('feature.json does not exist! Convert task fail.');
        }
        var json = grunt.file.readJSON('feature.json'),
            targetFiles = {},
            srcObj;
        for (var prop in json.feature) {
            if (prop!=='name' && prop!=='dependency') {
                if (!targetFiles[prop]) {
                    targetFiles[prop] = [];
                }
                for ( var index in json.feature[prop].script ) {
                    srcObj = json.feature[prop].script[index];
                    if (srcObj && srcObj.src ) {
                        // more one script
                        targetFiles[prop].push(srcObj.src );
                    } else {
                        // one script
                        targetFiles[prop].push(srcObj );
                    }
                }
            }
        }
        grunt.config.set('targetFiles',targetFiles);
    });
};