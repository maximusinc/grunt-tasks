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
            bundler.transform(require('babelify'), {
                presets: ['es2015', 'react'],
                extensions: ['.ts', '.tsx', '.js']
            });
        }
    }
};
