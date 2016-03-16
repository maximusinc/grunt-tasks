/**
 * Created by user on 16.03.2016.
 */

var arrData = [];

module.exports = {
    add: function(widgetInfo) {
        arrData.push(widgetInfo);
    },
    buildScript: function () {
        var preScript = '<script>\r\n';
        preScript += 'widgetUrls=window["widgetUrls"]||[];';
        preScript += 'baseUrls=window["baseUrls"]||[];';
        arrData.forEach(function (item) {
            preScript += 'widgetUrls['+item.mid+']="http://localhost/'+item.descriptor+'?mid='+item.mid+'&lang=ru";';
            preScript += 'baseUrls['+item.mid+']="http://localhost/'+item.descriptor+'";';
        });
        preScript += '</script>\r\n';
        return preScript;
    }
};
