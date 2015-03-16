module.exports = {
    options: {
        explicitArray: false,
    },
    xml2json: {
        src: ['feature.xml'],
        dest: 'feature.json'
    },
    json2xml: {
        options: {
            xml: {
                header: true
            }
        },
        src: ['feature.json'],
        dest: 'feature.xml'
    }
};