// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();

// exporter controllers
var control_accueil = require('../controllers/control_accueil')
var control_connexion = require('../controllers/control_connexion')
var control_eleves = require('../controllers/control_eleves')

// routage accueil
routeur.get('/', control_accueil.afficher)

// connexion
routeur.get('/connexion', control_connexion.afficher)

// eleves
routeur.get('/eleves/liste', control_eleves.afficher_liste)
routeur.get('/eleves/ajouter', control_eleves.afficher_ajouter)
routeur.get('/eleves/modifier/:id', control_eleves.afficher_modifier)

// routeur
module.exports = routeur;