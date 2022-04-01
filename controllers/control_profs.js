var model_profs = require('../models/model_profs');
var methods = require('./methods');

module.exports = {
    // affichage
    afficher_liste: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            titre = "Liste des professeurs";
            model_profs.lister(function (lesProfs) {
                res.render('./profs/liste', { titre, lesProfs })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
    afficher_ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            titre = "Ajouter un professeur";
            action = "/profs/ajouter"
            modifier = 0
            res.render('./profs/form', { titre, action, modifier })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
    afficher_modifier: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            id = req.params.id
            titre = "Modifier un professeur";
            action = "/profs/modifier/" + id
            modifier = 1

            model_profs.ficher(id, function (unProf) {
                if (unProf.length > 0) {
                    unProf = unProf[0]
                    res.render('./profs/form', { titre, action, modifier, unProf })
                } else {
                    req.flash('erreur', "Prof n'existe pas");
                    res.redirect('/')
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
    afficher_fiche: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            id = req.params.id
            titre = "Fiche de professeur";

            model_profs.ficher(id, function (unProf) {
                if (unProf.length > 0) {

                    unProf = unProf[0]
                    res.render('./profs/fiche', { titre, unProf })
                } else {
                    req.flash('erreur', "Prof n'existe pas");
                    res.redirect('/')
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

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

            model_profs.ajouter(params, function (data) {
                req.flash('valid', 'Professeur ajouté avec succès');
                res.redirect('./liste')
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

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

            model_profs.ficher(req.params.id, function (unProf) {
                if (unProf.length > 0) {
                    model_profs.modifier(params, function (data) {
                        req.flash('valid', 'Professeur modifié avec succès');
                        res.redirect('../liste')
                    })
                } else {
                    req.flash('erreur', "Prof n'existe pas");
                    res.redirect('/')
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

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
                    res.redirect('/')
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}