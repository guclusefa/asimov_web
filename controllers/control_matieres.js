var model_matieres = require('../models/model_matieres');
module.exports = {
    // affichage
    afficher_liste: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            titre = "Liste des matières";
            model_matieres.lister(function (lesMatieres) {
                res.render('./matieres/liste', { titre, lesMatieres })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
    afficher_ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            titre = "Ajouter une matière";
            action = "/matieres/ajouter"
            modifier = 0
            res.render('./matieres/form', { titre, action, modifier })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
    afficher_modifier: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.user_isAdministration == 1) { // si connecte

            id = req.params.id
            titre = "Modifier une matière";
            action = "/matieres/modifier/" + id
            modifier = 1

            model_matieres.ficher(id, function (uneMatiere) {
                if (uneMatiere.length > 0) {

                    uneMatiere = uneMatiere[0]
                    res.render('./matieres/form', { titre, action, modifier, uneMatiere })
                } else {
                    req.flash('erreur', "Matière n'existe pas");
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
            titre = "Fiche de matière";

            model_matieres.ficher(id, function (uneMatiere) {
                if (uneMatiere.length > 0) {

                    uneMatiere = uneMatiere[0]
                    res.render('./matieres/fiche', { titre, uneMatiere })
                } else {
                    req.flash('erreur', "Matière n'existe pas");
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
                libelle = req.body.libelle,
            ]

            model_matieres.ajouter(params, function (data) {
                req.flash('valid', 'Matière ajouté avec succès');
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
                libelle = req.body.libelle,
                id = req.params.id
            ]

            model_matieres.ficher(req.params.id, function (uneMatiere) {
                if (uneMatiere.length > 0) {

                    model_matieres.modifier(params, function (data) {
                        req.flash('valid', 'Matière modifié avec succès');
                        res.redirect('../liste')
                    })
                } else {
                    req.flash('erreur', "Matière n'existe pas");
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
            model_matieres.ficher(id, function (uneMatiere) {
                if (uneMatiere.length > 0) {
                    model_matieres.supprimer(id, function (data) {
                        req.flash('valid', 'Matière supprimé avec succès');
                        res.redirect('../liste')
                    })
                } else {
                    req.flash('erreur', "Matière n'existe pas");
                    res.redirect('/')
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}