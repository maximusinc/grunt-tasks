/**
 * Created by user on 22.03.2016.
 */

var grunt = require('grunt');
var pathModule = require('path');
var mime = require('mime');
var fs = require('fs');

module.exports = function (cssStr, file) {
    var rImages = /url(?:\(['|"]?)(.*?)(?:['|"]?\))(?!.*\/\*base64:skip\*\/)/ig,
        result = rImages.exec(cssStr),
        cache = {},
        cssDir = pathModule.dirname(file);
    var replacer = function (item) {
        var imgPath = pathModule.resolve( cssDir, item[1] );
        var result;
        if (cache[item[1]]) {
            cssStr = cssStr.replace( item[1], cache[item[1]] );
            result = rImages.exec(cssStr);
        } else {
            var binRes = fs.readFileSync(imgPath);
            var strRes = 'data:' + mime.lookup(imgPath) + ';base64,' + binRes.toString('base64');
            cssStr = cssStr.replace(item[1], strRes);
            result = rImages.exec(cssStr);

        }

        if(result !== null) {
            replacer(result);
        }

        return cssStr;
    };
    grunt.log.debug( JSON.stringify(result));
    if (result !== null) {
        return replacer(result);

    } else {
        // no need process
        return cssStr;
    }

};
