module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        titre = "Accueil";
        res.json({ titre })
    },
}