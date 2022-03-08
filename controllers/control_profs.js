var model_profs = require('../models/model_profs');
var model_matieres = require('../models/model_matieres');
module.exports = {
    // affichage
    afficher_liste: function(req, res) {
        titre = "Liste des professeurs";
        model_profs.lister(function(lesProfs) {
            res.render('./profs/liste', { titre, lesProfs })
        })
    },
    afficher_ajouter: function(req, res) {
        titre = "Ajouter un professeur";
        action = "/profs/ajouter"
        modifier = 0
        model_matieres.lister(function(lesMatieres) {
            res.render('./profs/form', { titre, action, modifier, lesMatieres })
        })
    },
    afficher_modifier: function(req, res) {
        id = req.params.id
        titre = "Modifier un professeur";
        action = "/profs/modifier/" + id
        modifier = 1

        model_profs.ficher(id, function(unProf) {
            model_matieres.lister(function(lesMatieres) {
                unProf = unProf[0]
                res.render('./profs/form', { titre, action, modifier, lesMatieres, unProf })
            })
        })
    },
    afficher_fiche: function(req, res) {
        id = req.params.id
        titre = "Fiche de professeur";

        model_profs.ficher(id, function(unProf) {
            unProf = unProf[0]
            res.render('./profs/fiche', { titre, unProf })
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
            email = req.body.email,
            principal = req.body.principal,
            matiere = req.body.matiere
        ]

        model_profs.ajouter(params, function(data) {
            req.flash('valid', 'Professeur ajouté avec succès');
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
            principal = req.body.principal,
            matiere = req.body.matiere,
            id = req.params.id
        ]

        model_profs.modifier(params, function(data) {
            req.flash('valid', 'Professeur modifié avec succès');
            res.redirect('../liste')
        })
    },

    supprimer: function(req, res) {
        id = req.params.id

        model_profs.supprimer(id, function(data) {
            req.flash('valid', 'Professeur supprimé avec succès');
            res.redirect('../liste')
        })
    },
}