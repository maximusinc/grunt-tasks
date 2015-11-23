module.exports = {
    dist: {
        files: {
            'js/dist.js': ['js/main.js']
        }
    },
    dev: {
        files: {
            '.tmp/js/dist.js': ['js/main.js']
        },
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
        transform: [require('grunt-react').browserify],
        watch: true
    }
};
