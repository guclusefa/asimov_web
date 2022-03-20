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
                                                    model_notes.getLesAvgMatiere(unCursus.cursus_id, function (lesAvgsMatiere) {
                                                        model_notes.getMoyenneEleve([unEleve.user_id, unCursus.cursus_id], function (lesMoyennesEleves) {
                                                            model_notes.getMoyenneClasse(unCursus.cursus_id, function (lesMoyennesClasses) {
                                                                model_notes.getLesMoyennesAnnuel(unCursus.cursus_id, function (lesMoyennesClassesAnnuel) {
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

                                                                                    // pour moyenne par matieres
                                                                                    lesNotesParMatT1 = []
                                                                                    lesNotesParMatT2 = []
                                                                                    lesNotesParMatT3 = []
                                                                                    lesNotesParMatT4 = []

                                                                                    // les moyennes par matierers
                                                                                    for (i in lesAvgsMatiere) {
                                                                                        if (lesAvgsMatiere[i].eval_idMatiere == element.matiere_id && lesAvgsMatiere[i].leAvg !== null) {
                                                                                            if (lesAvgsMatiere[i].eval_trimestre == 1) {
                                                                                                lesNotesParMatT1.push(lesAvgsMatiere[i].leAvg)
                                                                                            } else if (lesAvgsMatiere[i].eval_trimestre == 2) {
                                                                                                lesNotesParMatT2.push(lesAvgsMatiere[i].leAvg)
                                                                                            } else {
                                                                                                lesNotesParMatT3.push(lesAvgsMatiere[i].leAvg)
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                    //les bilans annuel
                                                                                    for (i in lesMoyennesClassesAnnuel) {
                                                                                        if (lesMoyennesClassesAnnuel[i].eval_idMatiere == element.matiere_id) {
                                                                                            lesNotesParMatT4.push(lesMoyennesClassesAnnuel[i].avg)
                                                                                        }
                                                                                    }

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
                                                                                    /////// a revoir ? peut etre jsp jvois pas dautre sol
                                                                                    element.bilanT1 = []
                                                                                    element.bilanT2 = []
                                                                                    element.bilanT3 = []
                                                                                    element.bilanT4 = []

                                                                                    // bilans par eleve
                                                                                    if (lesNotesParEvalT1.length > 0) {
                                                                                        element.bilanT1.eleve_avg = average(lesNotesParEvalT1).toFixed(2)
                                                                                    }
                                                                                    if (lesNotesParEvalT2.length > 0) {
                                                                                        element.bilanT2.eleve_avg = average(lesNotesParEvalT2).toFixed(2)
                                                                                    }
                                                                                    if (lesNotesParEvalT3.length > 0) {
                                                                                        element.bilanT3.eleve_avg = average(lesNotesParEvalT3).toFixed(2)
                                                                                    }


                                                                                    /* test */
                                                                                    /* pour moyenne annuel de matiere */
                                                                                    test = [element.bilanT1.eleve_avg, element.bilanT2.eleve_avg, element.bilanT3.eleve_avg].filter(n => n)
                                                                                    if (test.length > 0) {
                                                                                        element.bilanT4.eleve_avg = average(test)
                                                                                    }

                                                                                    // bilans par classe
                                                                                    if (lesNotesParMatT1.length > 0) {
                                                                                        element.bilanT1.classe_avg = average(lesNotesParMatT1).toFixed(2)
                                                                                        element.bilanT1.classe_max = Math.max(...lesNotesParMatT1).toFixed(2)
                                                                                        element.bilanT1.classe_min = Math.min(...lesNotesParMatT1).toFixed(2)
                                                                                    }

                                                                                    if (lesNotesParMatT2.length > 0) {
                                                                                        element.bilanT2.classe_avg = average(lesNotesParMatT2).toFixed(2)
                                                                                        element.bilanT2.classe_max = Math.max(...lesNotesParMatT2).toFixed(2)
                                                                                        element.bilanT2.classe_min = Math.min(...lesNotesParMatT2).toFixed(2)
                                                                                    }

                                                                                    if (lesNotesParMatT3.length > 0) {
                                                                                        element.bilanT3.classe_avg = average(lesNotesParMatT3).toFixed(2)
                                                                                        element.bilanT3.classe_max = Math.max(...lesNotesParMatT3).toFixed(2)
                                                                                        element.bilanT3.classe_min = Math.min(...lesNotesParMatT3).toFixed(2)
                                                                                    }
                                                                                    if (lesNotesParMatT4.length > 0) {
                                                                                        element.bilanT4.classe_avg = average(lesNotesParMatT4).toFixed(2)
                                                                                        element.bilanT4.classe_max = Math.max(...lesNotesParMatT4).toFixed(2)
                                                                                        element.bilanT4.classe_min = Math.min(...lesNotesParMatT4).toFixed(2)
                                                                                    }

                                                                                });
                                                                                // bilan par trimestre
                                                                                bilanClasseT1 = []
                                                                                bilanClasseT2 = []
                                                                                bilanClasseT3 = []
                                                                                lesMoyennesEleves.forEach(element => {
                                                                                    if (element.eval_trimestre == 1) {
                                                                                        bilanClasseT1.push(element.avg_eleve)
                                                                                    } else if (element.eval_trimestre == 2) {
                                                                                        bilanClasseT2.push(element.avg_eleve)
                                                                                    } else {
                                                                                        bilanClasseT3.push(element.avg_eleve)
                                                                                    }
                                                                                });
                                                                                lesMoyennesClasses.forEach(element => {
                                                                                    if (element.eval_trimestre == 1) {
                                                                                        bilanClasseT1.push(element.avg_classe)
                                                                                    } else if (element.eval_trimestre == 2) {
                                                                                        bilanClasseT2.push(element.avg_classe)
                                                                                    } else {
                                                                                        bilanClasseT3.push(element.avg_classe)
                                                                                    }
                                                                                });

                                                                                /* moyenne eleve + classe annuel */
                                                                                /* on peu ameliorer mais flemme pck ca marche  */
                                                                                bilanClasseT4 = []
                                                                                bilanClasseT4.push([bilanClasseT1[0], bilanClasseT2[0], bilanClasseT3[0]])
                                                                                bilanClasseT4.push([bilanClasseT1[1], bilanClasseT2[1], bilanClasseT3[1]])
                                                                                console.log(bilanClasseT4[0].filter(n => n))
                                                                                console.log(bilanClasseT4[0].filter(n => n).length)
                                                                                /* average +  filtraate */
                                                                                if (bilanClasseT4[0].filter(n => n).length > 0) {
                                                                                    bilanClasseT4[0] = average(bilanClasseT4[0].filter(n => n))
                                                                                    bilanClasseT4[1] = average(bilanClasseT4[1].filter(n => n))
                                                                                } else {
                                                                                    bilanClasseT4 = []
                                                                                }

                                                                                console.log(lesMatieres)
                                                                                res.render('./notes/fiche_eleve', { titre, unEleve, unCursus, lesEleves, lesCursus, lesMatieres, bilanClasseT1, bilanClasseT2, bilanClasseT3, bilanClasseT4 })
                                                                            })
                                                                        })
                                                                    })
                                                                })
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