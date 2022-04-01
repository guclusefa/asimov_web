// pour faire le bilan d'une eval : moyenne, min et max
// pour notes et eval
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

// pour verif user
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function Verifier_Numero_Telephone(num_tel) {
    // Definition du motif a matcher
    var regex = new RegExp(/^(01|02|03|04|05|06|08)[0-9]{8}/gi);

    // Definition de la variable booleene match
    var match = false;

    // Test sur le motif
    if (regex.test(num_tel)) {
        match = true;
    }
    else {
        match = false;
    }

    // On renvoie match
    return match;
}


function verifUser(nom, prenom, sexe, date, email, tel) {
    if (nom && prenom && sexe && date && email && tel &&
        (sexe == "F" || sexe == "M") &&
        !isNaN(Date.parse(date)) &&
        validateEmail(email) &&
        Verifier_Numero_Telephone(tel)
    ) {
        return true
    } else {
        return false
    }
}

module.exports = {
    average,
    bilanArray
};