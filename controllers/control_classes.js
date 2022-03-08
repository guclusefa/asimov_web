var model_classes = require('../models/model_classes');
module.exports = {
    // affichage
    afficher_liste: function(req, res) {
        titre = "Liste des classes";
        model_classes.lister(function(lesClasses) {
            res.render('./classes/liste', { titre, lesClasses })
        })
    },
    afficher_ajouter: function(req, res) {
        titre = "Ajouter une classe";
        action = "/classes/ajouter"
        modifier = 0
        res.render('./classes/form', { titre, action, modifier})
    },
    afficher_modifier: function(req, res) {
        id = req.params.id
        titre = "Modifier une classe";
        action = "/classes/modifier/" + id
        modifier = 1

        model_classes.ficher(id, function(uneClasse) {
            uneClasse = uneClasse[0]
            res.render('./classes/form', { titre, action, modifier, uneClasse})
        })
    },
    afficher_fiche: function(req, res) {
        id = req.params.id
        titre = "Fiche de classe";

        model_classes.ficher(id, function(uneClasse) {
            uneClasse = uneClasse[0]
            res.render('./classes/fiche', { titre, uneClasse })
        })
    },

    ajouter: function(req, res) {
        let params = [
            libelle = req.body.libelle,
        ]

        model_classes.ajouter(params, function(data) {
            req.flash('valid', 'classe ajouté avec succès');
            res.redirect('./liste')
        })
    },

    modifier: function(req, res) {
        let params = [
            libelle = req.body.libelle,
            id = req.params.id
        ]

        model_classes.modifier(params, function(data) {
            req.flash('valid', 'classe modifié avec succès');
            res.redirect('../liste')
        })
    },

    supprimer: function(req, res) {
        id = req.params.id

        model_classes.supprimer(id, function(data) {
            req.flash('valid', 'classe supprimé avec succès');
            res.redirect('../liste')
        })
    },
}