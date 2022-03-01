var model_accueil = require('../models/model_accueil');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        titre = "Accueil";
        res.render('./accueil', { titre })
    },
}