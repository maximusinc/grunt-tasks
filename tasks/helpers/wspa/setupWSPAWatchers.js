/**
 * Created by user on 16.03.2016.
 */

var grunt = require('grunt');

module.exports = function (widgetInfo) {
    var watchData = {
        files: [
            widgetInfo.widgetFolder + '/**/*.*'
        ],
        tasks: [ 'wspa' ],
        options: {
            spawn: false
        }
    };

    grunt.config('watch.' + widgetInfo.alias, watchData );
};
