var db = require("../config/database");
module.exports = {
    // page d'accueil
    executer_connexion: function(params, callback){
        var sql = 'SELECT * FROM Users WHERE user_id = ? AND user_mdp = ?' ;
        db.query(sql, params, function(err,data){
            if(err)throw err;
            return callback(data);
        });
    },
};
