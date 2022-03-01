// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();

// exporter controllers
var control_accueil = require('../controllers/control_accueil')
var control_connexion = require('../controllers/control_connexion')
var control_users = require('../controllers/control_users')


// routage accueil
routeur.get('/', control_accueil.afficher)

// connexion
routeur.get('/connexion', control_connexion.afficher)

// users
routeur.get('/users/liste', control_users.afficher_liste)
routeur.get('/users/ajouter', control_users.afficher_ajouter)


// routeur
module.exports = routeur;