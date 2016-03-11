var pathModule = require("path");
var grunt = require('grunt');

var clearUp = function (str) {
	var re = /^\.\.(\\|\/)/g;
	return re.test(str) ? clearUp(str.replace(re, "")) : str;
}

module.exports = {
	isUp: function (path) {
		var res = path.match(/\.\.(\\|\/)/g);
		return res && res.length || 0;
	},
	/**
	 * Create from path like ../../../test new test
	 * @type {[type]}
	 */
	clearUp: clearUp,
	getUpCount: function (path) {
		var res = path.match(/\.\.(\\|\/)/g);
		return res && res.length || null;
	},
	makeUpFromTmp: function (path) {
		var res = path.match(/\.tmp(\/|\\)_(\d)_/),
			c = res ? res[res.length-1] : 0,
			path = res ? path.replace(res[0],"") : path,
			aux = [];
		for(var i = 0; i < c; i++) {
			aux.push('..');
		}
		aux.push(path);
		return pathModule.join.apply(null, aux);
	},
	makeTmpFromUp: function (path, upCount) {
		upCount = typeof upCount === 'undefined' ? this.getUpCount(path) : upCount;
		return upCount === null ? path : pathModule.join( '.tmp', '_' + upCount + '_', this.clearUp( path ) )
	}
};
