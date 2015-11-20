module.exports = function (arr){
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    // usage example:
    return arr.filter( onlyUnique );
};
