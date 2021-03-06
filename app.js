// inclure les dépendances et middlewares ----------------------------------------------------------------------------------------------
const Routeur = require("./routes/routes");
const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');

// activer les dépendances ----------------------------------------------------------------------------------------------
let app = express();
app.set("view engine", "ejs");

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

//chemins static----------------------------------------------------------------------------------------------
app.use(express.static("views"));

// assets ----------------------------------------------------------------------------------------------
app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/css", express.static(__dirname + "/assets/css"));
app.use("/images", express.static(__dirname + "/assets/images"));
app.use("/assets", express.static(__dirname + "/assets"));

// modules ----------------------------------------------------------------------------------------------
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

// routage ----------------------------------------------------------------------------------------------
app.use("/", (Routeur));

// lancement serveur ----------------------------------------------------------------------------------------------
app.listen(3000, () => console.log("Le serveur est actif !"));
