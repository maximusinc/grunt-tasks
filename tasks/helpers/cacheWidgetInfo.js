/**
 * Created by user on 15.03.2016.
 */

var pathModule = require('path');
var getWidgetInfo = require('./getWidgetInfo');

module.exports = function (widgets, grunt) {
    var widgetsInfo = {};
    Object.keys(widgets).forEach(function(key) {
        if ( typeof widgets[key] === 'string' ) {
            widgetsInfo[ key ] = getWidgetInfo(grunt, widgets[key]);
            widgetsInfo[key].descriptor = widgets[key];
        } else if (widgets[key].descriptor) {
            widgetsInfo[key] = getWidgetInfo(grunt, widgets[key].descriptor);
            if ( typeof widgets[key].mid !== 'undefined') {
                widgetsInfo[key].mid = widgets[key].mid;
            }
            ['descriptor', 'params'].forEach(function(paramKey) {
                widgetsInfo[key][paramKey] = widgets[key][paramKey];
            });
        }
    });

    grunt.file.write( pathModule.join( '.grunt-cache', 'widgetsInfo.json' ), JSON.stringify(widgetsInfo) );
    return widgetsInfo;
};
