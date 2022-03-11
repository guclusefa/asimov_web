var model_notes = require('../models/model_notes');
var model_matieres = require('../models/model_matieres');
var model_classes = require('../models/model_classes');

module.exports = {
    // affichage
    afficher_liste: function (req, res) {
        titre = "Liste des notes";
        model_notes.lister(function (lesnotes) {
            res.render('./notes/liste', { titre, lesnotes })
        })
    },
    afficher_ajouter: function (req, res) {
        titre = "Ajouter une note";
        action = "/notes/ajouter"
        modifier = 0

        model_classes.lister(function (lesCursus) {
            model_matieres.lister(function (lesMatieres) {
                res.render('./notes/form', { titre, action, modifier, lesCursus, lesMatieres })
            })
        })
    },
    afficher_modifier: function (req, res) {
        id = req.params.id
        titre = "Modifier une note";
        action = "/notes/modifier/" + id
        modifier = 1

        model_notes.ficher(id, function (unEleve) {
            unEleve = unEleve[0]
            res.render('./notes/form', { titre, action, modifier, unEleve })
        })
    },
    afficher_fiche: function (req, res) {
        id = req.params.id
        titre = "Fiche de note";

        model_notes.ficher(id, function (unEleve) {
            unEleve = unEleve[0]
            res.render('./notes/fiche', { titre, unEleve })
        })
    },

    ajouter: function (req, res) {
        let params = [
            nom = req.body.nom,
            prenom = req.body.prenom,
            mdp = req.body.date,
            date = req.body.date.split("/").reverse().join("/"),
            sexe = req.body.sexe,
            tel = req.body.tel,
            email = req.body.email
        ]

        model_notes.ajouter(params, function (data) {
            req.flash('valid', 'Note ajouté avec succès');
            res.redirect('./liste')
        })
    },

    modifier: function (req, res) {
        let params = [
            nom = req.body.nom,
            prenom = req.body.prenom,
            date = req.body.date.split("/").reverse().join("/"),
            sexe = req.body.sexe,
            tel = req.body.tel,
            email = req.body.email,
            id = req.params.id
        ]

        model_notes.modifier(params, function (data) {
            req.flash('valid', 'Note modifié avec succès');
            res.redirect('../liste')
        })
    },

    supprimer: function (req, res) {
        id = req.params.id

        model_notes.supprimer(id, function (data) {
            req.flash('valid', 'Note supprimé avec succès');
            res.redirect('../liste')
        })
    },
}