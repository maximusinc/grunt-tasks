/**
 * Created by user on 18.03.2016.
 */

module.exports = function (config, injectToConfig) {
    try {
        config = JSON.parse(config);
        injectToConfig = typeof injectToConfig === 'string' ? JSON.parse(injectToConfig) : injectToConfig;
        for (var key in injectToConfig) {
            config[ key ] = injectToConfig[ key ];
        }
    } catch(e) {
        return config;
    }
    return JSON.stringify(config);
};
