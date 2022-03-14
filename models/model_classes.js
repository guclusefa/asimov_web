var db = require("../config/database");
module.exports = {
    // lister toutes les classes
    lister_classes: function(callback) {
        var sql = `SELECT * FROM Classes`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // lister les cursus
    lister: function(callback) {
        var sql = `SELECT * FROM Cursus, Classes, Users
        WHERE cursus_idClasse = classe_id
        AND cursus_idProfPrincipale = user_id`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // lister les cursus ou le prof d'une matiere ou prof principale (utilisé pour lister les classes)
    //// in profgeesssssssssssss
    lister_test: function(callback) {
        var sql = `SELECT * FROM Cursus, Classes, Users
        WHERE cursus_idClasse = classe_id
        AND cursus_idProfPrincipale = user_id
        AND user_id = ?
        OR user_id IN (SELECT cursus_prof_idProf FROM Cursus_Profs, Cursus WHERE cursus_prof_idCursus = cursus_id AND cursus_id = ?, AND cursus_prof_idProf = ?)`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // lister que cursus ou prof est prof d'une matiere
    listerParProf: function(params, callback) {
        var sql = `SELECT * FROM Cursus_Profs, Cursus, Classes WHERE cursus_prof_idCursus = cursus_id AND cursus_idClasse = classe_id AND cursus_prof_idProf = ? GROUP BY cursus_id;`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // lister eleves d'un cursus
    listerEleves: function(params, callback) {
        var sql = `SELECT * FROM Cursus_Eleves, Users WHERE cursus_eleve_idEleve = user_id AND cursus_eleve_idCursus = ? ORDER BY user_nom, user_prenom`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // lister les profs d'un cursus
    listerProfs: function(params, callback) {
        var sql = `SELECT * FROM Cursus_Profs, Users, Matieres WHERE cursus_prof_idProf = user_id AND cursus_prof_idMatiere = matiere_id AND cursus_prof_idCursus = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ajouter un cursus
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

    // recuperer l'id du dernier cursus crée utilisé lors de l'ajout
    dernierCursus: function(callback) {
        var sql = `SELECT cursus_id FROM Cursus ORDER BY cursus_id DESC LIMIT 1` 
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ajouter les eleves d'un cursus
    ajouterEleves: function(params, callback) {
        var sql = `INSERT INTO Cursus_Eleves 
        (cursus_eleve_idCursus, cursus_eleve_idEleve)
        VALUES (?, ?)`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ajouter les profs des matieres d'un cursus
    ajouterProfs: function(params, callback) {
        var sql = `INSERT INTO Cursus_Profs 
        (cursus_prof_idCursus, cursus_prof_idProf, cursus_prof_idMatiere)
        VALUES (?, ?, ?)`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // modifier cursus
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

    // supprimer les eleves d'un cursus
    supprimerClasseEleves: function(params, callback) {
        var sql = `DELETE FROM Cursus_Eleves WHERE cursus_eleve_idCursus = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // supprimer les profs d'un cursus
    supprimerClasseProfs: function(params, callback) {
        var sql = `DELETE FROM Cursus_Profs WHERE cursus_prof_idCursus = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // suprimmer cursus
    supprimer: function(params, callback) {
        var sql = `DELETE FROM Cursus WHERE cursus_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ficher un cursus
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