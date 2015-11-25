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
        transform: [require('grunt-react').browserify],
        watch: true
    }
};
