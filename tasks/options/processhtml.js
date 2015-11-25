module.exports = {
    options: {
        customBlockTypes: ['<%= customBlocksDir %>rx-jsx.js', '<%= customBlocksDir %>rx-scss.js']
    },
    make: {
        files: {
            '<%= destPath %>.tmp/main.html': ['<%= destPath %>.tmp/content-body.html']
        }
    },
    dev: {
        files: {
            '<%= destPath %>.tmp/main.html': ['<%= destPath %>.tmp/content-body.html']
        }
    },
    prod: {
        files: {
            '<%= destPath %>.tmp/main.html': ['<%= destPath %>.tmp/content-body.html']
        }
    }
};
