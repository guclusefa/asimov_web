var model_eleves = require('../models/model_eleves');
module.exports = {
    // affichage accueil
    afficher_liste: function (req, res) {
        titre = "Liste des élèvess";
        res.render('./eleves/liste', { titre })
    },
    afficher_ajouter: function (req, res) {
        titre = "Ajouter un élève";
        action = "/ajouter"
        res.render('./eleves/form', { titre, action })
    },
    afficher_modifier: function (req, res) {
        titre = "Modifier un élève";
        action = "/modifier/id"
        modifier = 1
        test = "1" 
        res.render('./eleves/form', { titre, action, modifier, test })
    },
}