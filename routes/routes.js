// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();

// exporter controllers
var control_accueil = require('../controllers/control_accueil')
var control_connexion = require('../controllers/control_connexion')
var control_eleves = require('../controllers/control_eleves')
var control_profs = require('../controllers/control_profs')
var control_matieres = require('../controllers/control_matieres')
var control_classes = require('../controllers/control_classes')
var control_evaluations = require('../controllers/control_evaluations')
var control_notes = require('../controllers/control_notes')

// accueil ----------------------------------------------------------------------------------------------
routeur.get('/', control_accueil.afficher)

// connexion ----------------------------------------------------------------------------------------------
routeur.get('/connexion', control_connexion.afficher)
routeur.post('/connexion', control_connexion.connexion)
routeur.get('/deconnexion', control_connexion.deconnexion)

// eleves ----------------------------------------------------------------------------------------------
routeur.get('/eleves/liste', control_eleves.afficher_liste)

routeur.get('/eleves/ajouter', control_eleves.afficher_ajouter)
routeur.post('/eleves/ajouter', control_eleves.ajouter)

routeur.get('/eleves/modifier/:id', control_eleves.afficher_modifier)
routeur.post('/eleves/modifier/:id', control_eleves.modifier)

routeur.get('/eleves/fiche/:id', control_eleves.afficher_fiche)

routeur.get('/eleves/supprimer/:id', control_eleves.supprimer)

// profs ----------------------------------------------------------------------------------------------
routeur.get('/profs/liste', control_profs.afficher_liste)

routeur.get('/profs/ajouter', control_profs.afficher_ajouter)
routeur.post('/profs/ajouter', control_profs.ajouter)

routeur.get('/profs/modifier/:id', control_profs.afficher_modifier)
routeur.post('/profs/modifier/:id', control_profs.modifier)

routeur.get('/profs/fiche/:id', control_profs.afficher_fiche)

routeur.get('/profs/supprimer/:id', control_profs.supprimer)

// matieres ----------------------------------------------------------------------------------------------
routeur.get('/matieres/liste', control_matieres.afficher_liste)

routeur.get('/matieres/ajouter', control_matieres.afficher_ajouter)
routeur.post('/matieres/ajouter', control_matieres.ajouter)

routeur.get('/matieres/modifier/:id', control_matieres.afficher_modifier)
routeur.post('/matieres/modifier/:id', control_matieres.modifier)

routeur.get('/matieres/fiche/:id', control_matieres.afficher_fiche)

routeur.get('/matieres/supprimer/:id', control_matieres.supprimer)

// classes ----------------------------------------------------------------------------------------------
routeur.get('/classes/liste', control_classes.afficher_liste)

routeur.get('/classes/ajouter', control_classes.afficher_ajouter)
routeur.post('/classes/ajouter', control_classes.ajouter)

routeur.get('/classes/modifier/:id', control_classes.afficher_modifier)
routeur.post('/classes/modifier/:id', control_classes.modifier)

routeur.get('/classes/fiche/:id', control_classes.afficher_fiche)

routeur.get('/classes/supprimer/:id', control_classes.supprimer)

// evaluations ----------------------------------------------------------------------------------------------
routeur.get('/evaluations/liste', control_evaluations.afficher_liste)

routeur.get('/evaluations/ajouter', control_evaluations.afficher_ajouter)
routeur.post('/evaluations/ajouter', control_evaluations.ajouter)

routeur.get('/evaluations/modifier/:id', control_evaluations.afficher_modifier)
routeur.post('/evaluations/modifier/:id', control_evaluations.modifier)

routeur.get('/evaluations/fiche/:id', control_evaluations.afficher_fiche)

routeur.get('/evaluations/supprimer/:id', control_evaluations.supprimer)

// notes ----------------------------------------------------------------------------------------------
routeur.get('/notes/fiche_eleve/:id', control_notes.afficher_fiche_eleve)
/* routeur.get('/notes/fiche_prof/:id', control_notes.afficher_fiche_prof)
routeur.get('/notes/fiche_classe/:id', control_notes.afficher_fiche_classe)
 */
// routeur
module.exports = routeur;