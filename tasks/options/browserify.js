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
        transform: [ ["babelify", {presets: ["es2015", "react"]}] ]
    }
};
