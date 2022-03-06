var model_eleves = require('../models/model_eleves');
module.exports = {
    // affichage accueil
    afficher_liste: function (req, res) {
        titre = "Liste des élèvess";
        res.render('./eleves/liste', { titre })
    },
    afficher_ajouter: function (req, res) {
        titre = "Ajouter un élève";
        res.render('./eleves/ajouter', { titre })
    },
}