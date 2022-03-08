var model_matieres = require('../models/model_matieres');
module.exports = {
    // affichage
    afficher_liste: function(req, res) {
        titre = "Liste des matières";
        model_matieres.lister(function(lesMatieres) {
            res.render('./matieres/liste', { titre, lesMatieres })
        })
    },
    afficher_ajouter: function(req, res) {
        titre = "Ajouter une matière";
        action = "/matieres/ajouter"
        modifier = 0
        res.render('./matieres/form', { titre, action, modifier})
    },
    afficher_modifier: function(req, res) {
        id = req.params.id
        titre = "Modifier une matière";
        action = "/matieres/modifier/" + id
        modifier = 1

        model_matieres.ficher(id, function(uneMatiere) {
            uneMatiere = uneMatiere[0]
            res.render('./matieres/form', { titre, action, modifier, uneMatiere})
        })
    },
    afficher_fiche: function(req, res) {
        id = req.params.id
        titre = "Fiche de matière";

        model_matieres.ficher(id, function(uneMatiere) {
            uneMatiere = uneMatiere[0]
            res.render('./matieres/fiche', { titre, uneMatiere })
        })
    },

    ajouter: function(req, res) {
        let params = [
            libelle = req.body.libelle,
        ]

        model_matieres.ajouter(params, function(data) {
            req.flash('valid', 'Matière ajouté avec succès');
            res.redirect('./liste')
        })
    },

    modifier: function(req, res) {
        let params = [
            libelle = req.body.libelle,
            id = req.params.id
        ]

        model_matieres.modifier(params, function(data) {
            req.flash('valid', 'Matière modifié avec succès');
            res.redirect('../liste')
        })
    },

    supprimer: function(req, res) {
        id = req.params.id

        model_matieres.supprimer(id, function(data) {
            req.flash('valid', 'Matière supprimé avec succès');
            res.redirect('../liste')
        })
    },
}