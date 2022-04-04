// inclure les dépendances et middlewares ----------------------------------------------------------------------------------------------
const Routeur = require("./routes/routes");
const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');

// activer les dépendances ----------------------------------------------------------------------------------------------
let app = express();

// bodypardser ----------------------------------------------------------------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// session ----------------------------------------------------------------------------------------------
app.use(session({
	secret:'leCodeSecretFlash',
	saveUninitialized: false,
	resave: false
}));

// msg flash + les variables qu'on utilse de partout ----------------------------------------------------------------------------------------------
app.use(flash())
app.use(function(req, res, next){
	valid = req.flash('valid'),
	erreur = req.flash('erreur'),
	user_info = req.session.user_info
    next();
});

// format ----------------------------------------------------------------------------------------------
app.set('json spaces', 2)

// routage ----------------------------------------------------------------------------------------------
app.use("/", (Routeur));

// lancement serveur ----------------------------------------------------------------------------------------------
app.listen(8080, () => console.log("Le serveur est actif !"));
