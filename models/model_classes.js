var db = require("../config/database");
module.exports = {
    // lister les classes
    lister_classes: function(callback) {
        var sql = `SELECT * FROM Classes`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    lister: function(callback) {
        var sql = `SELECT * FROM Cursus, Classes, Users
        WHERE cursus_idClasse = classe_id
        AND cursus_idProfPrincipale = user_id`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ajouter: function(params, callback) {
        var sql = `INSERT INTO Cursus 
        (cursus_anneeScolaire, cursus_libelle, cursus_idClasse, cursus_idProfPrincipal)
        VALUES (?, ?, ?, ?)`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    modifier: function(params, callback) {
        var sql = `UPDATE Cursus 
        SET cursus_anneeScolaire = ?,
        cursus_libelle = ?,
        cursus_idClasse = ?,
        cursus_idProfPrincipal = ?,
        WHERE cursus_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    supprimer: function(params, callback) {
        var sql = `DELETE FROM Cursus WHERE cursus_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ficher: function(params, callback) {
        var sql = `SELECT * FROM Cursus WHERE cursus_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};