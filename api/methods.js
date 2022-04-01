/* ------------------------------------ METHODES NOTE ET EVAL -------------------------------------------- */
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

/* ------------------------------------ METHODES DE VALIDATION -------------------------------------------- */
function validateTrim(str) {
    if (str.trim().length === 0) return false
    return true
}

function validateEmail(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) return true;
    return false;
}

function validateSexe(sexe) {
    if (sexe == "M" || sexe == "F") return true;
    return false;
}

function validateDate(date) {
    var validRegex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    if (date.match(validRegex)) return true;
    return false;
}

/* ------------------------------------ VERIF USER -------------------------------------------- */
function verifUser([nom, prenom, date, sexe, email]) {
    if (validateTrim(nom) && validateTrim(prenom) && validateTrim(sexe) && validateTrim(date) && validateTrim(email)){
        if (validateDate(date)) {
            if (validateSexe(sexe)) {
                if (validateEmail(email)) {
                    msg = "Valid"
                } else {
                    msg = "Email invalide"
                }
            } else {
                msg = "Sexe invalide"
            }
        } else {
            msg = "Date invalide"
        }
    } else {
        msg = "Remplir toutes les données"
    }
    return msg
}
/* ------------------------------------ VERIF MATIERE -------------------------------------------- */
function verifMatiere(libelle) {
    if (validateTrim(libelle)){
        msg = "Valid"
    } else {
        msg = "Remplir toutes les données"
    }
    return msg
}

module.exports = {
    average,
    bilanArray,
    verifUser,
    verifMatiere
};