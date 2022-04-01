var db = require("../config/database");
module.exports = {
    // lister matieres ----------------------------------------------------------------------------------------------
    lister: function(callback) {
        var sql = `SELECT * FROM Matieres ORDER BY matiere_id`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ajouter une matiere ----------------------------------------------------------------------------------------------
    ajouter: function(params, callback) {
        var sql = `INSERT INTO Matieres 
        (matiere_libelle)
        VALUES (?)`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // modifier une matiere ----------------------------------------------------------------------------------------------
    modifier: function(params, callback) {
        var sql = `UPDATE Matieres 
        SET matiere_libelle = ?
        WHERE matiere_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // supprimer une matiere ----------------------------------------------------------------------------------------------
    supprimer: function(params, callback) {
        var sql = `DELETE FROM Matieres WHERE matiere_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ficher une matiere ----------------------------------------------------------------------------------------------
    ficher: function(params, callback) {
        var sql = `SELECT * FROM Matieres WHERE matiere_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};