var model_connexion = require('../models/model_connexion');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        titre = "Connexion";
        res.render('./auth/connexion', { titre })
    },
}