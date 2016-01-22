module.exports = function (name){
	if (!name) return;
	return (name+'').replace(/\./g,'_');
};
