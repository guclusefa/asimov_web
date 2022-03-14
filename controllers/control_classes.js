var model_classes = require('../models/model_classes');
var model_profs = require('../models/model_profs');
var model_matieres = require('../models/model_matieres');
var model_eleves = require('../models/model_eleves');

module.exports = {
    // affichage
    afficher_liste: function (req, res) {
        if (req.session.user_info !== undefined && (req.session.user_info.user_isAdministration == 1 || req.session.user_info.user_isProf == 1)) { // si pas connecte
            // si administration = affiche toutes les classes
            if (req.session.user_info.user_isAdministration == 1) {
                titre = "Liste des classes";
                model_classes.lister(function (lesClasses) {
                    res.render('./classes/liste', { titre, lesClasses })
                })
            } else { // sinon affiche que mes classes (ou je suis prof ou ou je suis prof principal)
                titre = "Liste de mes classes";
                model_classes.listerMesClasses([req.session.user_info.user_id, req.session.user_info.user_id], function (lesClasses) {
                    res.render('./classes/liste', { titre, lesClasses })
                })
            }
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
    afficher_ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si pas connecte

            titre = "Ajouter une classe";
            action = "/classes/ajouter"
            modifier = 0
            model_classes.lister_classes(function (lesClasses) {
                model_eleves.lister(function (lesEleves) {
                    model_matieres.lister(function (lesMatieres) {
                        model_profs.lister(function (lesProfs) {
                            res.render('./classes/form', { titre, action, modifier, lesClasses, lesEleves, lesMatieres, lesProfs })
                        })
                    })
                })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    afficher_modifier: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si pas connecte

            id = req.params.id
            titre = "Modifier une classe";
            action = "/classes/modifier/" + id
            modifier = 1

            model_classes.ficher(id, function (uneClasse) {
                if (uneClasse.length > 0) {
                    model_classes.listerEleves(id, function (lesElevesClasse) {
                        model_classes.listerProfs(id, function (lesProfsClasse) {
                            model_classes.lister_classes(function (lesClasses) {
                                model_eleves.lister(function (lesEleves) {
                                    model_matieres.lister(function (lesMatieres) {
                                        model_profs.lister(function (lesProfs) {
                                            uneClasse = uneClasse[0]
                                            res.render('./classes/form', { titre, action, modifier, uneClasse, lesElevesClasse, lesProfsClasse, lesClasses, lesEleves, lesMatieres, lesProfs })
                                        })
                                    })
                                })
                            })
                        })
                    })
                } else {
                    req.flash('erreur', "Classe n'existe pas");
                    res.redirect('/')
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    afficher_fiche: function (req, res) {
        if (req.session.user_info !== undefined && (req.session.user_info.user_isAdministration == 1 || req.session.user_info.user_isProf == 1)) { // si pas connecte
            id = req.params.id
            titre = "Fiche de classe";

            model_classes.ficher(id, function (uneClasse) {
                if (uneClasse.length > 0) {

                    model_classes.listerEleves(id, function (lesElevesClasse) {
                        model_classes.listerProfs(id, function (lesProfsClasse) {
                            uneClasse = uneClasse[0]


                            // si prof c'est un prof de la classe
                            verification = 0
                            lesProfsClasse.forEach(element => {
                                if (element.cursus_prof_idProf == req.session.user_info.user_id) { verification = 1 }
                            });

                            // si admin ou prof principale ou un des prof de la classe
                            if (req.session.user_info.user_isAdministration == 1 || (req.session.user_info.user_id == uneClasse.cursus_idProfPrincipale || verification == 1)) {
                                res.render('./classes/fiche', { titre, uneClasse, lesElevesClasse, lesProfsClasse })
                            } else {
                                req.flash('erreur', "Vous n'êtes pas autorisé");
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
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    //reste a faire les modif
    // pas d'eleve dupliquer
    // prof principal forfement un prof d'une matiere
    ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si pas connecte

            let params = [
                annee = req.body.annee,
                libelle = req.body.libelle,
                classe = req.body.classe,
                principal = req.body.principal
            ]

            model_classes.ajouter(params, function (data) {
                model_classes.dernierCursus(function (cursus) {
                    cursusId = cursus[0].cursus_id

                    // ajouter eleves
                    // pour chaque eleve ajouter
                    req.body.eleves.forEach(element => {
                        let params = [cursusId, element]
                        model_classes.ajouterEleves(params, function (data) { })
                    });

                    // ajouter profs
                    // les idprofs et idmatiere des profs 
                    // tout ca car faut traduire la string en array car 2 valeurs dans le value
                    // j'ai pas trouvé de meilleur solution sinon faire requete sql mais flemme #ripbozo

                    for (i in req.body.profs) {
                        infoProfs = req.body.profs[i]
                        infoProfs = infoProfs.split(",")
                        idProf = infoProfs[0]
                        idMatiere = infoProfs[1]

                        let params = [cursusId, idProf, idMatiere]
                        model_classes.ajouterProfs(params, function (data) { })
                    }

                })
                req.flash('valid', 'Classe ajouté avec succès');
                res.redirect('./liste')
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    modifier: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si pas connecte

            id = req.params.id
            let params = [
                annee = req.body.annee,
                libelle = req.body.libelle,
                classe = req.body.classe,
                principal = req.body.principal,
                id = req.params.id
            ]

            model_classes.modifier(params, function (data) {
                model_classes.supprimerClasseEleves(id, function (data) {
                    //on supprime eleves pour les rajouter
                    req.body.eleves.forEach(element => {
                        let params = [id, element]
                        model_classes.ajouterEleves(params, function (data) { })
                    });
                    model_classes.supprimerClasseProfs(id, function (data) {
                        // on supprimer profs pour rajouter
                        for (i in req.body.profs) {
                            infoProfs = req.body.profs[i]
                            infoProfs = infoProfs.split(",")
                            idProf = infoProfs[0]
                            idMatiere = infoProfs[1]

                            let params = [id, idProf, idMatiere]
                            model_classes.ajouterProfs(params, function (data) { })
                        }

                        req.flash('valid', 'Classe modifié avec succès');
                        res.redirect('../liste')
                    })
                })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    supprimer: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si pas connecte

            id = req.params.id

            model_classes.supprimer(id, function (data) {
                req.flash('valid', 'Classe supprimé avec succès');
                res.redirect('../liste')
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}