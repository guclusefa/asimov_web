var db = require("../config/database");
module.exports = {
    // page d'accueil
    afficher: function (callback) {
        var sql = "SELECT * FROM Medicaments";
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};
