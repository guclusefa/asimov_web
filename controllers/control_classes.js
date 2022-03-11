var model_classes = require('../models/model_classes');
var model_profs = require('../models/model_profs');
var model_matieres = require('../models/model_matieres');
var model_eleves = require('../models/model_eleves');

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
            model_eleves.lister(function (lesEleves) {
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
                                merge_prof_matiere.push([lesMatieres[mat], listeProf])
                            }

                            lesProfsParMatiere = merge_prof_matiere
                            res.render('./classes/form', { titre, action, modifier, lesClasses, lesEleves, lesPrincipales, lesProfsParMatiere })
                        })
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
                model_eleves.lister(function (lesEleves) {
                    model_profs.lister_profPrincipal(function (lesPrincipales) {
                        model_classes.listerEleves(id, function (lesElevesClasse) {
                            model_classes.listerProfs(id, function (lesProfsClasse) {
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
                                            merge_prof_matiere.push([lesMatieres[mat], listeProf])
                                        }

                                        lesProfsParMatiere = merge_prof_matiere

                                        uneClasse = uneClasse[0]
                                        res.render('./classes/form', { titre, action, modifier, uneClasse, lesClasses, lesPrincipales, lesEleves, lesElevesClasse, lesProfsClasse, lesProfsParMatiere })
                                    })
                                })
                            })
                        })
                    })
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

        model_classes.ajouter(params, function (data) {
            model_classes.dernierCursus(function (cursus) {
                cursusId = cursus[0].cursus_id

                // ajouter eleves
                // pour chaque eleve ajouter
                req.body.eleves.forEach(element => {
                    let params = [cursusId, element]
                    model_classes.ajouterEleves(params, function (data) { })
                });

                // ajouter profs
                // les idprofs et idmatiere des profs 
                // tout ca car faut traduire la string en array car 2 valeurs dans le value
                // j'ai pas trouvé de meilleur solution sinon faire requete sql mais flemme #ripbozo

                for (i in req.body.profs) {
                    infoProfs = req.body.profs[i]
                    infoProfs = infoProfs.split(",")
                    idProf = infoProfs[0]
                    idMatiere = infoProfs[1]

                    let params = [cursusId, idProf, idMatiere]
                    model_classes.ajouterProfs(params, function (data) { })
                }

            })
            req.flash('valid', 'Classe ajouté avec succès');
            res.redirect('./liste')
        })
    },

    modifier: function (req, res) {
        id = req.params.id
        let params = [
            annee = req.body.annee,
            libelle = req.body.libelle,
            classe = req.body.classe,
            principal = req.body.principal,
            id = req.params.id
        ]

        model_classes.modifier(params, function (data) {
            model_classes.supprimerClasseEleves(id, function (data) {
                //on supprime eleves pour les rajouter
                req.body.eleves.forEach(element => {
                    let params = [id, element]
                    model_classes.ajouterEleves(params, function (data) { })
                });
                model_classes.supprimerClasseProfs(id, function (data) {
                    // on supprimer profs pour rajouter
                    for (i in req.body.profs) {
                        infoProfs = req.body.profs[i]
                        infoProfs = infoProfs.split(",")
                        idProf = infoProfs[0]
                        idMatiere = infoProfs[1]
    
                        let params = [id, idProf, idMatiere]
                        model_classes.ajouterProfs(params, function (data) { })
                    }
                    
                    req.flash('valid', 'Classe modifié avec succès');
                    res.redirect('../liste')
                })
            })
        })
    },

    supprimer: function (req, res) {
        id = req.params.id

        model_classes.supprimer(id, function (data) {
            req.flash('valid', 'Classe supprimé avec succès');
            res.redirect('../liste')
        })
    },
}