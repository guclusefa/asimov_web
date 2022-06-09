var model_responsables = require('../models/model_responsables');
var methods = require('./methods');

module.exports = {
    // affichage liste ----------------------------------------------------------------------------------------------
    afficher_liste: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            titre = "Liste des responsables";
            model_responsables.lister(function (lesResponsables) {
                res.json({ titre, valid, erreur, user_info, lesResponsables })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },

    // affichage ajouter ----------------------------------------------------------------------------------------------
    afficher_ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            titre = "Ajouter un responsable";
            action = "/responsables/ajouter"
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
            titre = "Modifier un responsable";
            action = "/responsables/modifier/" + id
            modifier = 1

            model_responsables.ficher(id, function (unResponsable) {
                if (unResponsable.length > 0) {

                    unResponsable = unResponsable[0]
                    res.json({ titre, valid, erreur, user_info, action, modifier, unResponsable })
                } else {
                    req.flash('erreur', "responsable n'existe pas");
                    res.redirect("/")
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },

    // afficher fiche ----------------------------------------------------------------------------------------------
    afficher_fiche: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            id = req.params.id
            titre = "Fiche d'responsable";

            model_responsables.ficher(id, function (unResponsable) {
                if (unResponsable.length > 0) {

                    unResponsable = unResponsable[0]
                    res.json({ titre, valid, erreur, user_info, unResponsable })
                } else {
                    req.flash('erreur', "responsable n'existe pas");
                    res.redirect("/")
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },

    // ajouter Responsable ----------------------------------------------------------------------------------------------
    ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            let params = [
                nom = req.body.nom,
                prenom = req.body.prenom,
                mdp = req.body.date,
                date = req.body.date.split("/").reverse().join("/"),
                sexe = req.body.sexe,
                tel = req.body.tel,
                email = req.body.email
            ]

            let paramsAverif = [
                req.body.nom,
                req.body.prenom,
                req.body.date,
                req.body.sexe,
                req.body.email
            ]

            if (methods.verifUser(paramsAverif) == "Valid") {

                model_responsables.ajouter(params, function (data) {
                    req.flash('valid', 'responsable ajouté avec succès');
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

    // modifier un Responsable ----------------------------------------------------------------------------------------------
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
                model_responsables.ficher(req.params.id, function (unResponsable) {
                    if (unResponsable.length > 0) {

                        model_responsables.modifier(params, function (data) {
                            req.flash('valid', 'responsable modifié avec succès');
                            res.redirect('../liste')
                        })
                    } else {
                        req.flash('erreur', "responsable n'existe pas");
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

    // supprimer un Responsable ----------------------------------------------------------------------------------------------
    supprimer: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            id = req.params.id
            model_responsables.ficher(id, function (unResponsable) {
                if (unResponsable.length > 0) {

                    model_responsables.supprimer(id, function (data) {
                        req.flash('valid', 'responsable supprimé avec succès');
                        res.redirect('../liste')
                    })
                } else {
                    req.flash('erreur', "responsable n'existe pas");
                    res.redirect("/")
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect("/")
        }
    },
}