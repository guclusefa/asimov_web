var model_evaluations = require('../models/model_evaluations');
var model_classes = require('../models/model_classes');
var methods = require('./methods');

module.exports = {
    // affichage liste ----------------------------------------------------------------------------------------------
    afficher_liste: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isProf == 1) { // si connecte et que c'est un
            titre = "Liste des evaluations";

            if (req.session.user_info.user_isProviseur == 1) { // si provisuer, peut ajouter voir toutes les matieres
                model_evaluations.lister(function (lesEvaluations) {
                    res.render('./evaluations/liste', { titre, lesEvaluations })
                })
            }
            else {
                model_evaluations.listerParProf(req.session.user_info.user_id, function (lesEvaluations) { // sinon peut voir ses eleves et les eval de ses classe si il en est prof princ
                    res.render('./evaluations/liste', { titre, lesEvaluations })
                })
            }
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    // affichage ajouter ----------------------------------------------------------------------------------------------
    afficher_ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isProf == 1) { // si connecte
            titre = "Ajouter une evaluation";
            action = "/evaluations/ajouter"
            modifier = 0

            if (req.session.user_info.user_isProviseur == 1) { // si provisuer, peut ajouter matieres dans tout les cursus
                model_classes.lister(function (lesCursus) {
                    model_evaluations.listerMatiereCursus(function (lesMatieresParCursus) {
                        res.render('./evaluations/form', { titre, action, modifier, lesCursus, lesMatieresParCursus })
                    })
                })
            } else { // sinon que prof peut ajouter que dans ses cursus a lui
                model_classes.listerParProf(req.session.user_info.user_id, function (lesCursus) {
                    model_evaluations.listerMatiereCursusParProf(req.session.user_info.user_id, function (lesMatieresParCursus) {
                        res.render('./evaluations/form', { titre, action, modifier, lesCursus, lesMatieresParCursus })
                    })
                })
            }
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    // affichage modifier ----------------------------------------------------------------------------------------------
    afficher_modifier: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isProf == 1) { // si connecte

            id = req.params.id
            titre = "Modifier une evaluation";
            action = "/evaluations/modifier/" + id
            modifier = 1

            model_evaluations.ficher(id, function (uneEval) {
                if (uneEval.length > 0) {

                    uneEval = uneEval[0]
                    // si proviseur : peut tout modifier ; sinon peut modifier que si c'est l'eval du prof
                    // utilisé pour view des profs principals
                    if (req.session.user_info.user_isProviseur == 1 || uneEval.eval_idProf == req.session.user_info.user_id) {
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
                    } else {
                        req.flash('erreur', "Vous n'êtes pas autorisé");
                        res.redirect('/evaluations/liste')
                    }
                } else {
                    req.flash('erreur', "Évaluation n'existe pas");
                    res.redirect('/')
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    // afficher fiche ----------------------------------------------------------------------------------------------
    afficher_fiche: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isProf == 1) { // si connecte

            id = req.params.id
            titre = "Fiche de evaluation";

            model_evaluations.ficher(id, function (uneEval) {
                if (uneEval.length > 0) {

                    uneEval = uneEval[0]
                    // si proviseur : peut voir
                    // si prof : peut voir que si c'est sa note
                    // si prof principal : peut voir que si c'est eval de sa classe ou il est prof principals
                    if (req.session.user_info.user_isProviseur == 1 || uneEval.eval_idProf == req.session.user_info.user_id || uneEval.cursus_idProfPrincipale == req.session.user_info.user_id) {
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
                                bilan = methods.bilanArray(bilanNotes)
                                min = bilan[0]
                                max = bilan[1]
                                moy = bilan[2]
                                res.render('./evaluations/fiche', { titre, uneEval, lesEleves, min, max, moy })
                            })
                        })

                    } else {
                        req.flash('erreur', "Vous n'êtes pas autorisé");
                        res.redirect('/evaluations/liste')
                    }
                } else {
                    req.flash('erreur', "Évaluation n'existe pas");
                    res.redirect('/')
                }
            })

        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },


    // ajouter une eval ----------------------------------------------------------------------------------------------
    // reste a faire les confitions de verif
    // il faut verif si la matiere existe dans le cursus etc
    ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isProf == 1) { // si connecte

            model_evaluations.selectProfMatiereCursus([req.body.cursus, req.body.matiere], function (leProf) {
                console.log(leProf)
                let params = [
                    desc = req.body.desc,
                    date = req.body.date.split("/").reverse().join("/"),
                    trimestre = req.body.trimestre,
                    cursus = req.body.cursus,
                    prof = leProf[0].cursus_prof_idProf,
                    matiere = req.body.matiere
                ]

                let paramsAVerif = [
                    req.body.cursus,
                    req.body.matiere,
                    req.body.desc,
                    req.body.trimestre,
                    req.body.date
                ]
                if (methods.verifEval(paramsAVerif) == "Valid") {

                    model_evaluations.ajouter(params, function (data) {
                        model_evaluations.selectDernierEval(function (idEval) {
                            req.flash('valid', 'evaluation ajouté avec succès');
                            res.redirect('./modifier/' + idEval[0].eval_id)
                        })
                    })

                } else {
                    req.flash('erreur', methods.verifEval(paramsAVerif));
                    res.redirect('/')
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    // modifier une eval ----------------------------------------------------------------------------------------------
    modifier: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isProf == 1) { // si connecte
            id = req.params.id
            let params = [
                desc = req.body.desc,
                date = req.body.date.split("/").reverse().join("/"),
                trimestre = req.body.trimestre,
                id = req.params.id
            ]

            // vu qu'on modifie pas cursus et matiere on prend 1 pur valider fonction
            let paramsAVerif = [
                '1',
                '1',
                req.body.desc,
                req.body.trimestre,
                req.body.date
            ]
            if (methods.verifEval(paramsAVerif) == "Valid") {
                if (methods.verifEval2(req.body.eleves, req.body.notes) == "Valid") {
                    model_evaluations.ficher(id, function (uneEval) {
                        if (uneEval.length > 0) {

                            uneEval = uneEval[0]
                            // si proviseur : peut tout modifier ; sinon peut modifier que si c'est l'eval du prof
                            // utilisé pour view des profs principals
                            if (req.session.user_info.user_isProviseur == 1 || uneEval.eval_idProf == req.session.user_info.user_id) {
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
                            } else {
                                req.flash('erreur', "Vous n'êtes pas autorisé");
                                res.redirect('/evaluations/liste')
                            }
                        } else {
                            req.flash('erreur', "Évaluation n'existe pas");
                            res.redirect('/')
                        }
                    })
                } else {
                    req.flash('erreur', methods.verifEval2(req.body.eleves, req.body.notes));
                    res.redirect('/')
                }
            } else {
                req.flash('erreur', methods.verifEval(paramsAVerif));
                res.redirect('/')
            }
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    // supprimer une eval ----------------------------------------------------------------------------------------------
    supprimer: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isProf == 1) { // si connecte

            id = req.params.id
            model_evaluations.ficher(id, function (uneEval) {
                if (uneEval.length > 0) {

                    uneEval = uneEval[0]
                    // si proviseur : peut tout modifier ; sinon peut modifier que si c'est l'eval du prof
                    // utilisé pour view des profs principals
                    if (req.session.user_info.user_isProviseur == 1 || uneEval.eval_idProf == req.session.user_info.user_id) {
                        model_evaluations.supprimer(id, function (data) {
                            req.flash('valid', 'evaluation supprimé avec succès');
                            res.redirect('../liste')
                        })
                    } else {
                        req.flash('erreur', "Vous n'êtes pas autorisé");
                        res.redirect('/evaluations/liste')
                    }
                } else {
                    req.flash('erreur', "Évaluation n'existe pas");
                    res.redirect('/')
                }
            })

        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}