/**
 * Created by user on 16.03.2016.
 */

var arrData = [],
    defaultParams = {
        "lang": "ru"
    },
    buildParams = function (params) {
        params = params || {};
        var arrQuery = [];
        for(var dKey in defaultParams) {
            if (!(dKey in params)) {
                arrQuery.push( dKey + '=' + defaultParams[dKey] );
            }
        }
        for( var key in params) {
            arrQuery.push(key + '=' + params[key]);
        }

        return arrQuery.join('&');
    };

module.exports = {
    add: function(widgetInfo) {
        arrData.push(widgetInfo);
    },
    buildScript: function () {
        var preScript = '<script>\r\n';
        preScript += 'widgetUrls=window["widgetUrls"]||[];';
        preScript += 'baseUrls=window["baseUrls"]||[];';
        arrData.forEach(function (item) {
            preScript += 'widgetUrls['+item.mid+']="http://localhost/' +
                            item.descriptor +
                            '?mid='+item.mid+'&'+ buildParams(item.params) +'";';
            preScript += 'baseUrls['+item.mid+']="http://localhost/'+item.descriptor+'";';
        });
        preScript += '</script>\r\n';
        return preScript;
    }
};
