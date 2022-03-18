var model_notes = require('../models/model_notes');
var model_eleves = require('../models/model_eleves');
var model_profs = require('../models/model_profs');
var model_classes = require('../models/model_classes');

function removeDuplicates(arr) {
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

module.exports = {
    afficher_fiche_eleve: function (req, res) {
        // si l'eleve
        if (req.session.user_info !== undefined /* && req.params.id == req.session.user_info.user_id *//*  && req.session.user_info.isProf == 0 && req.session.user_info.isAdministration == 0 */) {
            id = req.params.id
            idClasse = req.params.classe
            titre = "Fiche de notes d'élève";


            // dabord afficher eleves -> check si eleve existe
            // affiche classe eleves
            // aifccher notes de la classe de l'eleve -> check si classe est dans eleves

            //Step1
            // remplir eleve
            if (id == 0) {
                model_eleves.lister(function (lesEleves) {
                    res.render('./notes/fiche_eleve', { titre, lesEleves })
                })
                // step 2
                // replir classe de l'eleve
            } else if (idClasse == 0) {
                model_eleves.ficher(id, function (unEleve) {
                    if (unEleve.length > 0) {
                        unEleve = unEleve[0]

                        model_eleves.lister(function (lesEleves) {
                            model_notes.lesClassesEleves(unEleve.user_id, function (lesCursus) {
                                res.render('./notes/fiche_eleve', { titre, unEleve, lesEleves, lesCursus })
                            })
                        })
                    } else {
                        req.flash('erreur', "Élève n'existe pas");
                        res.redirect('/')
                    }
                })
                // step 3
                // affiche notes de l'eleve
            } else {
                model_eleves.ficher(id, function (unEleve) {
                    if (unEleve.length > 0) {
                        unEleve = unEleve[0]
                        model_classes.ficher(idClasse, function (unCursus) {
                            if (unCursus.length > 0) {
                                unCursus = unCursus[0]
                                model_eleves.lister(function (lesEleves) {
                                    model_notes.lesClassesEleves(unEleve.user_id, function (lesCursus) {
                                        // verification que bonne combinaiason eleve classe
                                        verif = false
                                        lesCursus.forEach(element => {
                                            if (element.cursus_id == unCursus.cursus_id) { verif = true }
                                        });

                                        if (verif) {
                                            model_notes.lesNotesEleves([unEleve.user_id, unCursus.cursus_id], function (lesNotes) {
                                                model_notes.lesMatieresEleves([unEleve.user_id, unCursus.cursus_id], function (lesMatieres) {
                                                    
                                                    // attribuer notes par matieres, par trimestre
                                                    lesMatieres.forEach(element => {
                                                        element.notesT1 = {}
                                                        element.notesT2 = {}
                                                        element.notesT3 = {}
                                                        iT1 = 1
                                                        iT2 = 1
                                                        iT3 = 1
                                                        lesNotes.forEach(element2 => {
                                                            if (element.matiere_id == element2.matiere_id) {
                                                                if (element2.eval_trimestre == 1) {
                                                                    element.notesT1["note" + iT1] = element2
                                                                    iT1++
                                                                } else if (element2.eval_trimestre == 2) {
                                                                    element.notesT2["note" + iT2] = element2
                                                                    iT2++
                                                                } else {
                                                                    element.notesT3["note" + iT3] = element2
                                                                    iT3++
                                                                }
                                                            }
                                                        });
                                                    });
                                                    console.log(lesMatieres)
                                                    console.log(lesMatieres.notesT2)
                                                    res.render('./notes/fiche_eleve', { titre, unEleve, unCursus, lesEleves, lesCursus, lesMatieres })
                                                })
                                            })
                                        } else {
                                            req.flash('erreur', "Cette élève n'est pas dans cette classe");
                                            res.redirect('/')
                                        }
                                    })
                                })
                            } else {
                                req.flash('erreur', "Classe n'existe pas");
                                res.redirect('/')
                            }
                        })
                    } else {
                        req.flash('erreur', "Élève n'existe pas");
                        res.redirect('/')
                    }
                })
            }
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}