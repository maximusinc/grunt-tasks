/**
 * Created by user on 16.03.2016.
 */


var featuresResolver = require('./helpers/featuresResolver');
module.exports = function (grunt) {
    grunt.registerTask('resolverTest', function () {
       grunt.log.debug( featuresResolver(['auth-refresh']) );
    });
}
