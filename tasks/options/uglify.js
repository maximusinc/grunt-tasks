module.exports = {
    options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */',
        sourceMap: true,
    },
    target: {
        files: {}
    }
};