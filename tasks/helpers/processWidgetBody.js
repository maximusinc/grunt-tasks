/**
 * Created by user on 15.03.2016.
 */

var grunt = require('grunt');
var HTMLProcessor = require('htmlprocessor');
var pathModule = require('path');

module.exports = function(htmlBody, options, params) {
    var processor = new HTMLProcessor({
            process: false,
            data: {
                widgetFolder: options.widgetFolder
            },
            templateSettings: null,
            includeBase: options.base || null,
            commentMarker: 'build',
            strip: false,
            recursive: false,
            customBlockTypes: ['node_modules/rx-grunt-tasks/custom-blocks/rx-jsx.js'],
            environment: "wspa" + (options.alias ? '_'+options.alias : '')
        }),
        arrToReplace = [],
        filesToCopy = [{
            expand: true,
            src: [
                '**/*',
                '!js/**',
                '!*'
            ],
            dest: options.base,
            cwd: options.widgetFolder
        }],
        processedBody = processor.processContent(htmlBody);

    //TODO process js files too
    var matchers =  typeof processedBody === 'string' ? processedBody.match(/<\s*link.*href=["\']([^"']*)["\'].*/ig) : null;

    // replace css files paths relative root
    if (matchers && matchers.length) {
        arrToReplace = matchers.map(function(line) {
            var m = line.match(/^\s*<\s*link.*href=["\']([^"']*)["\'].*$/i);
            //skip absolute urls
            if (m &&
                m.length &&
                m[1].substr(0,1) !== "/" &&
                m[1].substr(0,5) !== "http:" &&
                m[1].substr(0,6) !== "https:" &&
                m[1].substr(0,5) !== "file:"
            ) {
                filesToCopy[0].src.push(m[1]);
                return [line, line.replace(m[1],options.base + m[1])];
            } else {
                return null;
            }
        });
        arrToReplace.forEach(function (rItem) {
            if (rItem && rItem[0] && rItem[1]) {
                processedBody = processedBody.replace(rItem[0],rItem[1]);
            }
        });
    }
    // prepend locales to widget html output
    if (params.locales && params.locales[0]) {
        processedBody = '<script type="text/javascript">com.rooxteam.i18n.setLocales(' + JSON.stringify(params.locales[0]) + ', "' + params.mid + '")</script>\r\n' + processedBody;
    }

    // add widget runner
    processedBody += '<script>gadgets.util.runOnLoadHandlers(' + params.mid + ');</script>';
    grunt.log.debug( JSON.stringify(filesToCopy) );
    grunt.config('copy.'+options.alias, {
        files: filesToCopy
    } );

    grunt.task.run('copy:'+options.alias);
    grunt.log.debug( processedBody );
    return processedBody;

};
