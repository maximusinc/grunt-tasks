module.exports = function (processor) {
    var grunt = require('grunt');
    var env = processor.options.environment;
	var baseWidgetFolder = processor.data && processor.data.widgetFolder;
    var prefix = grunt.config.get('destPath');
	var includeBase = processor.options.includeBase;

	processor.registerBlockType('rxJSX', function (content, block, blockLine, blockContent) {
        grunt.log.debug("baseWidgetFolder " + baseWidgetFolder);
		var target = grunt.task.current.target || env;
		var widgetFolder = baseWidgetFolder || grunt.config.get('widgetFolder');
		var aux = blockContent.match(/src="([^"]+)/);
		var outFile = (includeBase? includeBase : prefix) + block.asset;
		var files = {};
		var fromFiles = [];
		fromFiles.push(  widgetFolder + '/' + aux[1]);
        grunt.log.debug("DDDDDDDDDDD",fromFiles);
		files[outFile] = fromFiles;
		grunt.config.set('browserify.'+target+'.files', files);
        var script = '<script type="text/javascript" src="' + block.asset + '" ></script>';
        var result = content.replace(blockLine, script);
        grunt.task.run(['browserify:'+target]);
		return result;
	});
};
