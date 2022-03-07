var model_eleves = require('../models/model_eleves');
module.exports = {
    // affichage
    afficher_liste: function(req, res) {
        titre = "Liste des élèves";
        model_eleves.lister(function(lesEleves) {
            res.render('./eleves/liste', { titre, lesEleves })
        })
    },
    afficher_ajouter: function(req, res) {
        titre = "Ajouter un élève";
        action = "/eleves/ajouter"
        modifier = 0
        res.render('./eleves/form', { titre, action, modifier })
    },
    afficher_modifier: function(req, res) {
        id = req.params.id
        titre = "Modifier un élève";
        action = "/eleves/modifier/" + id
        modifier = 1

        model_eleves.ficher(id, function(unEleve) {
            unEleve = unEleve[0]
            res.render('./eleves/form', { titre, action, modifier, unEleve })
        })
    },
    afficher_fiche: function(req, res) {
        id = req.params.id
        titre = "Fiche d'élève";

        model_eleves.ficher(id, function(unEleve) {
            unEleve = unEleve[0]
            res.render('./eleves/fiche', { titre, unEleve })
        })
    },

    ajouter: function(req, res) {
        let params = [
            nom = req.body.nom,
            prenom = req.body.prenom,
            mdp = req.body.date,
            date = req.body.date.split("/").reverse().join("/"),
            sexe = req.body.sexe,
            tel = req.body.tel,
            email = req.body.email
        ]

        model_eleves.ajouter(params, function(data) {
            req.flash('valid', 'Élève ajouté avec succès');
            res.redirect('./liste')
        })
    },

    modifier: function(req, res) {
        let params = [
            nom = req.body.nom,
            prenom = req.body.prenom,
            date = req.body.date.split("/").reverse().join("/"),
            sexe = req.body.sexe,
            tel = req.body.tel,
            email = req.body.email,
            id = req.params.id
        ]

        model_eleves.modifier(params, function(data) {
            req.flash('valid', 'Élève modifié avec succès');
            res.redirect('../liste')
        })
    },

    supprimer: function(req, res) {
        id = req.params.id

        model_eleves.supprimer(id, function(data) {
            req.flash('valid', 'Élève supprimé avec succès');
            res.redirect('../liste')
        })
    },
}