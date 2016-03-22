/**
 * Created by user on 22.03.2016.
 */

var cssToRadium = require('css-to-radium');
var grunt = require('grunt');
var pathModule = require('path');
var base64 = require('./base64');

module.exports = function (featureXmlPath) {
    var featureXmlDir = pathModule.dirname(featureXmlPath);
    grunt.file.expand( featureXmlDir + '/**/*.css').forEach(function (file) {
        var cssStr = grunt.file.read( file );
        cssStr = base64(cssStr, file);
        var cssJs = cssToRadium( cssStr );
        var parsed = pathModule.parse(file);
        parsed.ext = '.js';
        parsed.base = parsed.name + parsed.ext;
        grunt.file.write( pathModule.format(parsed), "module.exports = " + JSON.stringify(cssJs) + ";" );
    });
};
