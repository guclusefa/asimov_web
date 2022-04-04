var model_profs = require('../models/model_profs');
var methods = require('./methods');

module.exports = {
    // affichage liste ----------------------------------------------------------------------------------------------
    afficher_liste: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            titre = "Liste des professeurs";
            model_profs.lister(function (lesProfs) {
                res.json({ titre, valid, erreur, user_info, lesProfs })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },

    // affichae ajouter ----------------------------------------------------------------------------------------------
    afficher_ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            titre = "Ajouter un professeur";
            action = "/profs/ajouter"
            modifier = 0
            res.json({ titre, valid, erreur, user_info, action, modifier })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },

    // affichage modifier ----------------------------------------------------------------------------------------------
    afficher_modifier: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            id = req.params.id
            titre = "Modifier un professeur";
            action = "/profs/modifier/" + id
            modifier = 1

            model_profs.ficher(id, function (unProf) {
                if (unProf.length > 0) {
                    unProf = unProf[0]
                    res.json({ titre, valid, erreur, user_info, action, modifier, unProf })
                } else {
                    req.flash('erreur', "Prof n'existe pas");
                    res.redirect("/")
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },

    // affichage fiche ----------------------------------------------------------------------------------------------
    afficher_fiche: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            id = req.params.id
            titre = "Fiche de professeur";

            model_profs.ficher(id, function (unProf) {
                if (unProf.length > 0) {

                    unProf = unProf[0]
                    res.json({ titre, valid, erreur, user_info, unProf })
                } else {
                    req.flash('erreur', "Prof n'existe pas");
                    res.redirect("/")
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },

    // ajouter un prof ----------------------------------------------------------------------------------------------
    ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            let params = [
                nom = req.body.nom,
                prenom = req.body.prenom,
                mdp = req.body.date,
                date = req.body.date.split("/").reverse().join("/"),
                sexe = req.body.sexe,
                tel = req.body.tel,
                email = req.body.email,
            ]

            let paramsAverif = [
                req.body.nom,
                req.body.prenom,
                req.body.date,
                req.body.sexe,
                req.body.email
            ]

            if (methods.verifUser(paramsAverif) == "Valid") {
                model_profs.ajouter(params, function (data) {
                    req.flash('valid', 'Professeur ajouté avec succès');
                    res.redirect('./liste')
                })
            } else {
                req.flash('erreur', methods.verifUser(paramsAverif));
                res.redirect("/")
            }
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },

    // modifier un eleve ----------------------------------------------------------------------------------------------
    modifier: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            let params = [
                nom = req.body.nom,
                prenom = req.body.prenom,
                date = req.body.date.split("/").reverse().join("/"),
                sexe = req.body.sexe,
                tel = req.body.tel,
                email = req.body.email,
                id = req.params.id
            ]

            let paramsAverif = [
                req.body.nom,
                req.body.prenom,
                req.body.date,
                req.body.sexe,
                req.body.email
            ]

            if (methods.verifUser(paramsAverif) == "Valid") {
                model_profs.ficher(req.params.id, function (unProf) {
                    if (unProf.length > 0) {
                        model_profs.modifier(params, function (data) {
                            req.flash('valid', 'Professeur modifié avec succès');
                            res.redirect('../liste')
                        })
                    } else {
                        req.flash('erreur', "Prof n'existe pas");
                        res.redirect("/")
                    }
                })
            } else {
                req.flash('erreur', methods.verifUser(paramsAverif));
                res.redirect("/")
            }
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },

    // supprimer un eleve ----------------------------------------------------------------------------------------------
    supprimer: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            id = req.params.id
            model_profs.ficher(id, function (unProf) {
                if (unProf.length > 0) {

                    model_profs.supprimer(id, function (data) {
                        req.flash('valid', 'Professeur supprimé avec succès');
                        res.redirect('../liste')
                    })
                } else {
                    req.flash('erreur', "Prof n'existe pas");
                    res.redirect("/")
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },
}