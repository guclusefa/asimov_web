var model_classes = require('../models/model_classes');
var model_profs = require('../models/model_profs');
var model_matieres = require('../models/model_matieres');
module.exports = {
    // affichage
    afficher_liste: function (req, res) {
        titre = "Liste des classes";
        model_classes.lister(function (lesClasses) {
            res.render('./classes/liste', { titre, lesClasses })
        })
    },
    afficher_ajouter: function (req, res) {
        titre = "Ajouter une classe";
        action = "/classes/ajouter"
        modifier = 0
        model_classes.lister_classes(function (lesClasses) {
            model_profs.lister_profPrincipal(function (lesPrincipales) {
                model_matieres.lister_matieresPrises(function (lesMatieres) {
                    model_matieres.lister_profsParMatieres(function (lesProfsParMatiere) {

                        // les profs par matieres
                        merge_prof_matiere = []
                        for (mat in lesMatieres) {
                            listeProf = []
                            for (prof in lesProfsParMatiere) {
                                if (lesMatieres[mat].matiere_id == lesProfsParMatiere[prof].user_idMatiere) {
                                    listeProf.push(lesProfsParMatiere[prof])
                                }
                            }
                            merge_prof_matiere.push([lesMatieres[mat],  listeProf]) 
                        }

                        lesProfsParMatiere = merge_prof_matiere
                        res.render('./classes/form', { titre, action, modifier, lesClasses, lesPrincipales, lesProfsParMatiere })
                    })
                })
            })
        })
    },
    afficher_modifier: function (req, res) {
        id = req.params.id
        titre = "Modifier une classe";
        action = "/classes/modifier/" + id
        modifier = 1

        model_classes.ficher(id, function (uneClasse) {
            model_classes.lister_classes(function (lesClasses) {
                model_profs.lister_profPrincipal(function (lesPrincipales) {
                    uneClasse = uneClasse[0]
                    res.render('./classes/form', { titre, action, modifier, uneClasse, lesClasses, lesPrincipales })
                })
            })
        })
    },
    afficher_fiche: function (req, res) {
        id = req.params.id
        titre = "Fiche de classe";

        model_classes.ficher(id, function (uneClasse) {
            uneClasse = uneClasse[0]
            res.render('./classes/fiche', { titre, uneClasse })
        })
    },

    ajouter: function (req, res) {
        let params = [
            annee = req.body.annee,
            libelle = req.body.libelle,
            classe = req.body.classe,
            principal = req.body.principal
        ]


        console.log(req.body.eleves)
        console.log(req.body.profs)
        model_classes.ajouter(params, function (data) {
            req.flash('valid', 'classe ajouté avec succès');
            res.redirect('./liste')
        })
    },

    modifier: function (req, res) {
        let params = [
            annee = req.body.annee,
            libelle = req.body.libelle,
            classe = req.body.classe,
            principal = req.body.principal,
            id = req.params.id
        ]

        model_classes.modifier(params, function (data) {
            req.flash('valid', 'classe modifié avec succès');
            res.redirect('../liste')
        })
    },

    supprimer: function (req, res) {
        id = req.params.id

        model_classes.supprimer(id, function (data) {
            req.flash('valid', 'classe supprimé avec succès');
            res.redirect('../liste')
        })
    },
}