var model_notes = require('../models/model_notes');
var model_eleves = require('../models/model_eleves');
var model_profs = require('../models/model_profs');
var model_classes = require('../models/model_classes');
module.exports = {
    afficher_fiche_eleve: function (req, res) {
        // si l'eleve
        if (req.session.user_info !== undefined /* && req.params.id == req.session.user_info.user_id *//*  && req.session.user_info.isProf == 0 && req.session.user_info.isAdministration == 0 */) {
            id = req.params.id
            idClasse = req.params.classe
            titre = "Fiche de notes d'élève";


            // dabord afficher eleves -> check si eleve existe
            // affiche classe eleves
            // aifccher notes de la classe de l'eleve -> check si classe est dans eleves
            model_eleves.ficher(id, function (unEleve) {
                if (unEleve.length > 0) {
                    unEleve = unEleve[0]
                    model_classes.ficher(idClasse, function (uneClasse) {
                        if (uneClasse.length > 0) {
                            model_eleves.lister(function (lesEleves) {
                                res.render('./notes/fiche_eleve', { titre, unEleve, lesEleves })
                            })
                        }
                    })
                } else {
                    req.flash('erreur', "Élève n'existe pas");
                    res.redirect('/')
                }
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}