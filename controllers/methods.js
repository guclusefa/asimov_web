// pour faire le bilan d'une eval : moyenne, min et max
const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

function bilanArray(array) {
    min = array[0]
    max = array[0]
    array.forEach(element => {
        if (element < min) min = element
        if (element > max) max = element
    });
    if (typeof min !== "undefined") {
        moy = average(array)
    } else {
        moy = undefined
    }
    return [min, max, moy]
}

module.exports = { average, bilanArray };