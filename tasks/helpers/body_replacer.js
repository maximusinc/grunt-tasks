
module.exports = function (body, conf, options) {
	return body.replace(/__MODULE_ID__/g,conf.mid);
};
