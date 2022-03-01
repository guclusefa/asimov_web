// inclure les dépendances et middlewares
const Routeur = require("./routes/routes");
const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');

// activer les dépendances
let app = express();
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//chemins static
app.use(express.static("views"));
app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/css", express.static(__dirname + "/assets/css"));
app.use("/scss", express.static(__dirname + "/assets/scss"));
app.use("/images", express.static(__dirname + "/assets/images"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/icons", express.static(__dirname + "/node_modules/bootstrap-icons/icons"));


app.listen(3000, () => console.log("Le serveur est actif !"));
app.use("/", (Routeur));