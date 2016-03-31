module.exports = function (body, conf, options, widgetConfig) {
	//@todo improve extensibility, finish generic config substution
	var replaced = body.replace(/__MODULE_ID__/g,conf.mid);
	var wrsConfig = widgetConfig["com.rooxteam.config"]);
	if (wrsConfig.CDN_URL) {
		replaced = replaced.replace(/__CONFIG_CDN_URL__/g, wrsConfig.CDN_URL);
	}
	return replaced;
};