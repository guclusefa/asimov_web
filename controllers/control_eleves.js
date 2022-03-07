var model_eleves = require('../models/model_eleves');
var model_classes = require('../models/model_classes');
module.exports = {
    // affichage
    afficher_liste: function (req, res) {
        titre = "Liste des élèves";
        res.render('./eleves/liste', { titre })
    },
    afficher_ajouter: function (req, res) {
        titre = "Ajouter un élève";
        action = "/eleves/ajouter"
        modifier = 0

        model_classes.lister(function (lesClasses) {
            res.render('./eleves/form', { titre, action, modifier, lesClasses })
        })
    },
    afficher_modifier: function (req, res) {
        titre = "Modifier un élève";
        action = "/eleves/modifier/id"
        modifier = 1
        test = "1"

        model_classes.lister(function (lesClasses) {
            res.render('./eleves/form', { titre, action, modifier, lesClasses, test })
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

        model_eleves.ajouter(params, function (data) {
            req.flash('valid', 'Élève ajouter avec succès');
            res.redirect('./liste')
        })
    },
}