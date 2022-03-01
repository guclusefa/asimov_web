var model_users = require('../models/model_users');
module.exports = {
    // affichage accueil
    afficher_liste: function (req, res) {
        titre = "Liste des utilisateurs";
        res.render('./users/liste', { titre })
    },
    afficher_ajouter: function (req, res) {
        titre = "Ajouter un utilisateur";
        res.render('./users/ajouter', { titre })
    },
}