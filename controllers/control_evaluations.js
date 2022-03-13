var model_evaluations = require('../models/model_evaluations');
var model_classes = require('../models/model_classes');

const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
function bilanArray(array) {
    min = array[0]
    max = array[0]
    array.forEach(element => {
        if (element < min) min = element
        if (element > max) max = element
    });
    moy = average(array)
    return [min, max, moy]
}

module.exports = {
    // affichage
    afficher_liste: function (req, res) {
        titre = "Liste des evaluations";
        model_evaluations.lister(function (lesEvaluations) {
            res.render('./evaluations/liste', { titre, lesEvaluations })
        })
    },
    afficher_ajouter: function (req, res) {
        titre = "Ajouter une evaluation";
        action = "/evaluations/ajouter"
        modifier = 0

        model_classes.lister(function (lesCursus) {
            model_evaluations.listerMatiereCursus(function (lesMatieresParCursus) {
                res.render('./evaluations/form', { titre, action, modifier, lesCursus, lesMatieresParCursus })
            })
        })
    },
    afficher_modifier: function (req, res) {
        id = req.params.id
        titre = "Modifier une evaluation";
        action = "/evaluations/modifier/" + id
        modifier = 1

        model_evaluations.ficher(id, function (uneEval) {
            uneEval = uneEval[0]
            model_evaluations.ficherEleves(uneEval.eval_idCursus, function (lesEleves) {
                model_evaluations.ficherNotesEleves(uneEval.eval_id, function (lesNotesEleves) {
                    // ajouter notes (opssible avec 1 requete ? jsp mais comme ça c'est facile a se retrouver)
                    // utiliser pour 1ere affiche pck apres ils ont forcement des notes si une modification a été faite donc pas besoin de check mais comme ca
                    // evite de faire une requete bizar
                    lesEleves.forEach(element => {
                        lesNotesEleves.forEach(element2 => {
                            if (element.user_id == element2.note_idEleve) {
                                element.note_valeur = element2.note_valeur
                            }
                        });
                    });
                    res.render('./evaluations/form', { titre, action, modifier, uneEval, lesEleves })
                })
            })
        })
    },
    afficher_fiche: function (req, res) {
        id = req.params.id
        titre = "Fiche de evaluation";

        model_evaluations.ficher(id, function (uneEval) {
            uneEval = uneEval[0]
            model_evaluations.ficherEleves(uneEval.eval_idCursus, function (lesEleves) {
                model_evaluations.ficherNotesEleves(uneEval.eval_id, function (lesNotesEleves) {
                    bilanNotes = []

                    // ajouter notes (opssible avec 1 requete ? jsp mais comme ça c'est facile a se retrouver)
                    // utiliser pour 1ere affiche pck apres ils ont forcement des notes si une modification a été faite donc pas besoin de check mais comme ca
                    // evite de faire une requete bizar
                    lesEleves.forEach(element => {
                        lesNotesEleves.forEach(element2 => {
                            if (element.user_id == element2.note_idEleve) {
                                element.note_valeur = element2.note_valeur
                            }
                        });
                        if (element.note_valeur !== null) {
                            bilanNotes.push(element.note_valeur)
                        }
                    });

                    //  bilan de l'éval
                    bilan = bilanArray(bilanNotes)
                    min = bilan[0]
                    max = bilan[1]
                    moy = bilan[2]
                    res.render('./evaluations/fiche', { titre, uneEval, lesEleves, min, max, moy})
                })
            })
        })
    },

    ajouter: function (req, res) {
        model_evaluations.selectProfMatiereCursus([req.body.cursus, req.body.matiere], function (leProf) {
            console.log(leProf)
            let params = [
                desc = req.body.desc,
                date = req.body.date.split("/").reverse().join("/"),
                cursus = req.body.cursus,
                prof = leProf[0].cursus_prof_idProf,
                matiere = req.body.matiere
            ]

            model_evaluations.ajouter(params, function (data) {
                model_evaluations.selectDernierEval(function (idEval) {
                    req.flash('valid', 'evaluation ajouté avec succès');
                    res.redirect('./modifier/' + idEval[0].eval_id)
                })
            })
        })
    },

    modifier: function (req, res) {
        let params = [
            desc = req.body.desc,
            date = req.body.date.split("/").reverse().join("/"),
            id = req.params.id
        ]

        // supprime notes et on ajoute pour eviter de check pour chaque update si existe ou pas
        model_evaluations.supprimerNotes(id, function (data) {
            for (i in req.body.eleves) {
                if (!req.body.notes[i]) req.body.notes[i] = null
                model_evaluations.ajouterNotes([req.body.notes[i], id, req.body.eleves[i]], function (data) { })
            }
        })

        model_evaluations.modifier(params, function (data) {
            req.flash('valid', 'evaluation modifié avec succès');
            res.redirect('../liste')
        })
    },

    supprimer: function (req, res) {
        id = req.params.id

        model_evaluations.supprimer(id, function (data) {
            req.flash('valid', 'evaluation supprimé avec succès');
            res.redirect('../liste')
        })
    },
}