var db = require("../config/database");
module.exports = {
    // page d'accueil
    ajouter: function(params, callback){
        var sql = 'INSERT INTO Users (user_nom, user_prenom, user_mdp, user_dateNaissance, user_sexe, user_tel, user_mail) VALUES (?,?,?,?,?,?,?)' ;
        db.query(sql, params, function(err,data){
            if(err)throw err;
            return callback(data);
        });
    },
};
