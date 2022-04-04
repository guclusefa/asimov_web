// methodes eval et notes ----------------------------------------------------------------------------------------------
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

// méthodes validations ----------------------------------------------------------------------------------------------
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

function isNum(val) {
    return !isNaN(val)
}

function onlyNumbers(array) {
    return array.every(element => {
        return !isNaN(element);
    });
}

function onlyNumbersProfs(array) {
    return array.every(element => {
        return !isNaN(element.trim().replace(',', ''));
    });
}

function hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

function validerNotes(notes){
    for (i in notes){
        if (notes[i] == null || notes[i] >= 0 && notes[i] <= 100){
            verif = true
        } else {
            verif = false
            break
        }
    }
    return verif
}

// verification user ----------------------------------------------------------------------------------------------
function verifUser([nom, prenom, date, sexe, email]) {
    if (validateTrim(nom) && validateTrim(prenom) && validateTrim(sexe) && validateTrim(date) && validateTrim(email)) {
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

// verification matiere ----------------------------------------------------------------------------------------------
function verifMatiere(libelle) {
    if (validateTrim(libelle)) {
        msg = "Valid"
    } else {
        msg = "Remplir toutes les données"
    }
    return msg
}

// verification classes ----------------------------------------------------------------------------------------------
function verifClasse([classe, annee, libelle, principal], profs, eleves) {
    if (validateTrim(classe) && validateTrim(annee) && validateTrim(libelle) && validateTrim(principal) && profs && eleves) {
        if (classe >= 1 && classe <= 7 && isNum(classe)) {
            if (annee >= 2000 && annee <= 2050 && isNum(annee)) {
                if (isNum(principal)) {
                    if (!hasDuplicates(eleves) && onlyNumbers(eleves)) {
                        if (onlyNumbersProfs(profs)) {
                            msg = "Valid"
                        } else {
                            msg = "Professeurs invalides"
                        }
                    } else {
                        msg = "Eleves invalide"
                    }
                } else {
                    msg = "Professeur principal invalide"
                }
            } else {
                msg = "Annee invalide"
            }
        } else {
            msg = "Classe invalide"
        }
    } else {
        msg = "Remplir toutes les données"
    }
    return msg
}

// verification eval pour ajouter ----------------------------------------------------------------------------------------------
function verifEval([classe, matiere, desc, trimestre, date]) {
    if (validateTrim(classe) && validateTrim(matiere) && validateTrim(desc) && validateTrim(trimestre) && validateTrim(date)) {
        if (isNum(classe)) {
            if (isNum(matiere)) {
                if (isNum(trimestre) && trimestre >= 1 && trimestre <= 3) {
                    if (validateDate(date)) {
                        msg = "Valid"
                    } else {
                        msg = "Date invalide"
                    }
                } else {
                    msg = "Trimestre invalide"
                }
            } else {
                msg = "Classe invalide"
            }
        } else {
            msg = "Classe invalide"
        }
    } else {
        msg = "Remplir toutes les données"
    }
    return msg
}

// verification eval modifier ----------------------------------------------------------------------------------------------
function verifEval2(eleves, notes) {
    if (eleves && notes) {
        if (onlyNumbers(eleves)) {
            if (validerNotes(notes)) {
                msg = "Valid"
            } else {
                msg = "Notes invalide"
            }
        } else {
            msg = "Eleves invalide"
        }
    } else {
        msg = "Remplir toutes les données"
    }
    return msg
}

module.exports = {
    average,
    bilanArray,
    verifUser,
    verifMatiere,
    verifClasse,
    verifEval,
    verifEval2
};