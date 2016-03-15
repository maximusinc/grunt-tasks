module.exports = function (processor) {
    var grunt = require('grunt');
    var env = processor.options.environment;
    var prefix = grunt.config.get('destPath');
	var includeBase = processor.options.includeBase;

	processor.registerBlockType('rxJSX', function (content, block, blockLine, blockContent) {
		var target = grunt.task.current.target || env;
		var widgetFolder = grunt.config.get('widgetFolder');
		var aux = blockContent.match(/src="([^"]+)/);
		var outFile = (includeBase? includeBase : prefix) + block.asset;
		var files = {};
		var fromFiles = [];
		fromFiles.push( widgetFolder + aux[1]);
		files[outFile] = fromFiles;
		grunt.config.set('browserify.'+target+'.files', files);
        var script = '<script type="text/javascript" src="' + includeBase + block.asset + '" ></script>';
        var result = content.replace(blockLine, script);
        grunt.task.run(['browserify:'+target]);
		return result;
	});
};
