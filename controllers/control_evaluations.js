var model_evaluations = require('../models/model_evaluations');
var model_classes = require('../models/model_classes');

module.exports = {
    // affichage
    afficher_liste: function (req, res) {
        titre = "Liste des evaluations";
        model_evaluations.lister(function (lesEvaluations) {
             res.render('./evaluations/liste', { titre, lesEvaluations })
        })
    },
    afficher_ajouter: function (req, res) {
        titre = "Ajouter une evaluation";
        action = "/evaluations/ajouter"
        modifier = 0

        model_classes.lister(function (lesCursus) {
            model_evaluations.listerMatiereCursus(function (lesMatieresParCursus) {
                res.render('./evaluations/form', { titre, action, modifier, lesCursus, lesMatieresParCursus })
            })
        })
    },
    afficher_modifier: function (req, res) {
        id = req.params.id
        titre = "Modifier une evaluation";
        action = "/evaluations/modifier/" + id
        modifier = 1

        model_evaluations.ficher(id, function (unEleve) {
            unEleve = unEleve[0]
            res.render('./evaluations/form', { titre, action, modifier, unEleve })
        })
    },
    afficher_fiche: function (req, res) {
        id = req.params.id
        titre = "Fiche de evaluation";

        model_evaluations.ficher(id, function (unEleve) {
            unEleve = unEleve[0]
            res.render('./evaluations/fiche', { titre, unEleve })
        })
    },

    ajouter: function (req, res) {
        model_evaluations.selectProfMatiereCursus([req.body.cursus, req.body.matiere], function (leProf) {
            console.log(leProf)
            let params = [
                desc = req.body.desc,
                date = req.body.date.split("/").reverse().join("/"),
                cursus = req.body.cursus,
                prof = leProf[0].cursus_prof_idProf,
                matiere = req.body.matiere
            ]

            model_evaluations.ajouter(params, function (data) {
                model_evaluations.selectDernierEval(function (idEval) {
                    req.flash('valid', 'evaluation ajouté avec succès');
                    res.redirect('./modifier/'+idEval[0].eval_id)
                })
            })
        })
    },

    modifier: function (req, res) {
        let params = [
            nom = req.body.nom,
            prenom = req.body.prenom,
            date = req.body.date.split("/").reverse().join("/"),
            sexe = req.body.sexe,
            tel = req.body.tel,
            email = req.body.email,
            id = req.params.id
        ]

        model_evaluations.modifier(params, function (data) {
            req.flash('valid', 'evaluation modifié avec succès');
            res.redirect('../liste')
        })
    },

    supprimer: function (req, res) {
        id = req.params.id

        model_evaluations.supprimer(id, function (data) {
            req.flash('valid', 'evaluation supprimé avec succès');
            res.redirect('../liste')
        })
    },
}