module.exports = function (processor) {
    var grunt = require('grunt');
    var env = processor.options.environment;
    var prefix = grunt.config.get('destPath');

  // This will allow to use this <!-- build:customBlock[:target] <value> --> syntax
  processor.registerBlockType('rxSCSS', function (content, block, blockLine, blockContent) {
    var widgetFolder = grunt.config.get('widgetFolder');
    var destPath = grunt.config.get('destPath');
    var aux = blockContent.match(/href="([^"]+)/);
    var outFile = prefix + block.asset;
    var files = {};
    var fromFiles = [];
    fromFiles.push(widgetFolder + aux[1]);
    files[outFile] = fromFiles;
    grunt.config.set('sass.make.files', files);
    var newBlockLine = blockContent.replace('text/scss', 'text/css');
    newBlockLine = newBlockLine.replace(aux[1], block.asset);
    var result = content.replace(blockLine, newBlockLine);
    grunt.task.run(['sass:make']);
    return result;
  });
};
