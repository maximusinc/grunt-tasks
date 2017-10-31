module.exports = {
    dist: {
        files: {
            'js/dist.js': ['js/main.js']
        }
    },
    prod: {
        options: {
            debug: false
        }
    },
    dev: {
        options: {
            debug: true
        }
    },
    make: {
        options: {
            debug: true
        }
    },
    options: {
        configure: function (bundler) {
            bundler.plugin(require('tsify'));
            var vueify = require('vueify');

            bundler.transform(require('svg-browserify'), {

            }).transform(require('browserify-css'), {
                extensions: ['.ts', '.tsx']
            }).transform(require('babelify'), {
                presets: ['es2015', 'react'],
                plugins: [
                    ["transform-object-rest-spread", { "useBuiltIns": true }],
                    ["transform-es2015-template-literals"],
                    ["transform-class-properties", { "spec": true }]
                ],
                extensions: ['.ts', '.tsx', '.js']
            }).transform(require('vueify'), {
                extensions: ['.jsx', '.js']
            });

        }
    }
};
