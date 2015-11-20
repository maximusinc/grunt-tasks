module.exports = function (body, conf) {
	return body.replace(/__MODULE_ID__/g,conf.mid);
};
