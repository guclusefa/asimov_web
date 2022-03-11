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

    listerEleves: function(params, callback) {
        var sql = `SELECT * FROM Cursus_Eleves, Users WHERE cursus_eleve_idEleve = user_id AND cursus_eleve_idCursus = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    listerProfs: function(params, callback) {
        var sql = `SELECT * FROM Cursus_Profs, Users, Matieres WHERE cursus_prof_idProf = user_id AND cursus_prof_idMatiere = matiere_id AND cursus_prof_idCursus = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ajouter: function(params, callback) {
        var sql = `INSERT INTO Cursus 
        (cursus_anneeScolaire, cursus_libelle, cursus_idClasse, cursus_idProfPrincipale)
        VALUES (?, ?, ?, ?)`;
        var sql2 = `SELECT cursus_id FROM Cursus ORDER BY cursus_id DESC LIMIT 1` 
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    dernierCursus: function(callback) {
        var sql = `SELECT cursus_id FROM Cursus ORDER BY cursus_id DESC LIMIT 1` 
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ajouterEleves: function(params, callback) {
        var sql = `INSERT INTO Cursus_Eleves 
        (cursus_eleve_idCursus, cursus_eleve_idEleve)
        VALUES (?, ?)`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ajouterProfs: function(params, callback) {
        var sql = `INSERT INTO Cursus_Profs 
        (cursus_prof_idCursus, cursus_prof_idProf, cursus_prof_idMatiere)
        VALUES (?, ?, ?)`;
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
        cursus_idProfPrincipale = ?
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
        var sql = `SELECT * FROM Cursus, Classes, Users
        WHERE cursus_idClasse = classe_id
        AND cursus_idProfPrincipale = user_id
        AND cursus_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};