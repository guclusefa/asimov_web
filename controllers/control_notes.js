var model_notes = require('../models/model_notes');
var model_eleves = require('../models/model_eleves');
var model_profs = require('../models/model_profs');
var model_classes = require('../models/model_classes');

const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

module.exports = {
    afficher_fiche_eleve: function (req, res) {
        // si l'eleve
        if (req.session.user_info !== undefined) {
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
                                                    // test pour les min max avg
                                                    model_notes.getMinEval(function (lesMinEval) {
                                                        model_notes.getMaxEval(function (lesMaxEval) {
                                                            model_notes.getAvgEval(function (lesAvgEval) {
                                                                // attribuer notes par matieres, par trimestre
                                                                lesMatieres.forEach(element => {
                                                                    // notes par trimestres
                                                                    element.notesT1 = []
                                                                    element.notesT2 = []
                                                                    element.notesT3 = []

                                                                    // pour moyenne par evals
                                                                    lesNotesParEvalT1 = []
                                                                    lesNotesParEvalT2 = []
                                                                    lesNotesParEvalT3 = []

                                                                    // pour moyenne par matieres (in profress)
                                                                    lesNotesParMatT1 = []
                                                                    lesNotesParMatT2 = []
                                                                    lesNotesParMatT3 = []

                                                                    // les notes par matieres
                                                                    lesNotes.forEach(element2 => {
                                                                        // ajoute min max avg
                                                                        for (i in lesMinEval) {
                                                                            if (element2.eval_id == lesMinEval[i].note_idEval) {
                                                                                element2.eval_min = lesMinEval[i].min
                                                                                element2.eval_max = lesMaxEval[i].max
                                                                                element2.eval_avg = lesAvgEval[i].avg
                                                                            }
                                                                        }

                                                                        // ajout des valeurs
                                                                        if (element.matiere_id == element2.matiere_id) {
                                                                            // t1
                                                                            if (element2.eval_trimestre == 1) {
                                                                                element.notesT1.push(element2)
                                                                                if (element2.note_valeur !== null) lesNotesParEvalT1.push(element2.note_valeur)
                                                                                // t2
                                                                            } else if (element2.eval_trimestre == 2) {
                                                                                element.notesT2.push(element2)
                                                                                if (element2.note_valeur !== null) lesNotesParEvalT2.push(element2.note_valeur)
                                                                                // t3
                                                                            } else {
                                                                                element.notesT3.push(element2)
                                                                                if (element2.note_valeur !== null) lesNotesParEvalT3.push(element2.note_valeur)
                                                                            }
                                                                        }
                                                                    });

                                                                    // bilans des matieres
                                                                    element.bilanT1 = []
                                                                    element.bilanT2 = []
                                                                    element.bilanT3 = []

                                                                    /////// a revoir
                                                                    element.bilanT1.eleve_avg = average(lesNotesParEvalT1)
                                                                    element.bilanT2.eleve_avg = average(lesNotesParEvalT2)
                                                                    element.bilanT3.eleve_avg = average(lesNotesParEvalT3)
                                                                });
                                                                console.log(lesMatieres)
                                                                res.render('./notes/fiche_eleve', { titre, unEleve, unCursus, lesEleves, lesCursus, lesMatieres })

                                                            })
                                                        })
                                                    })
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