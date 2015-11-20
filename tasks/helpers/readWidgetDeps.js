module.exports = function (grunt, distPath){
	'use strict';
	var getXmlDoc = require('./getXmlDoc');
	var recursDeps = require('./recursDeps');
	var getUnique = require('./getUnique');
	var result = [] ,
    docXml;
    result.push(distPath);
    docXml = getXmlDoc(grunt, distPath);
    docXml.childs.forEach(function (child) {
        if (child.name === 'dependency' && child.childs.length ) {
            recursDeps(grunt, child.childs[0], result);
        }
    })
    return getUnique(result.reverse());
};
