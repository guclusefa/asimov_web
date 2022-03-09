var db = require("../config/database");
module.exports = {
    // lister les classes
    lister_profsParMatieres: function(callback) {
        var sql = `SELECT * FROM Users
        WHERE user_idMatiere IS NOT NULL 
        AND user_idMatiere IN (SELECT matiere_id FROM Matieres) 
        ORDER BY user_idMatiere`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    lister_matieresPrises: function(callback) {
        var sql = `SELECT * FROM Matieres 
        WHERE matiere_id IN (SELECT user_idMatiere FROM Users)
        ORDER BY matiere_id`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },


    lister: function(callback) {
        var sql = `SELECT * FROM Matieres ORDER BY matiere_id`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ajouter: function(params, callback) {
        var sql = `INSERT INTO Matieres 
        (matiere_libelle)
        VALUES (?)`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    modifier: function(params, callback) {
        var sql = `UPDATE Matieres 
        SET matiere_libelle = ?
        WHERE matiere_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    supprimer: function(params, callback) {
        var sql = `DELETE FROM Matieres WHERE matiere_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ficher: function(params, callback) {
        var sql = `SELECT * FROM Matieres WHERE matiere_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};