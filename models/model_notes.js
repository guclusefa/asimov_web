var db = require("../config/database");
module.exports = {
    // page d'accueil
    selectDernierEval: function(callback) {
        var sql = `SELECT * FROM Evaluations ORDER BY eval_id DESC LIMIT 1;`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    selectProfMatiereCursus: function(params, callback) {
        var sql = `SELECT * FROM Cursus_Profs WHERE cursus_prof_idCursus = ? AND cursus_prof_idMatiere = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    listerMatiereCursus: function(callback) {
        var sql = `SELECT * FROM Cursus_Profs, Cursus, Matieres, Users WHERE cursus_prof_idCursus = cursus_id AND cursus_prof_idMatiere = matiere_id AND cursus_prof_idProf = user_id;`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    lister: function(callback) {
        var sql = `SELECT *,
        DATE_FORMAT(user_dateNaissance, '%d/%m/%Y') as eval_date
        FROM Evaluations, Cursus, Users, Matieres, Classes
        WHERE eval_idCursus = cursus_id
        AND eval_idProf = user_id
        AND eval_idMatiere = matiere_id
        AND cursus_idClasse = classe_id`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ajouter: function(params, callback) {
        var sql = `INSERT INTO Evaluations (eval_desc, eval_date, eval_idCursus, eval_idProf, eval_idMatiere) VALUES (?,?,?,?,?)`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    modifier: function(params, callback) {
        var sql = `UPDATE Users 
        SET user_nom = ?,
        user_prenom = ?,
        user_dateNaissance = ?, 
        user_sexe = ?, 
        user_tel = ?, 
        user_mail = ?
        WHERE user_id = ? `;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    supprimer: function(params, callback) {
        var sql = `DELETE FROM Users WHERE user_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ficher: function(params, callback) {
        var sql = `SELECT *,
        TIMESTAMPDIFF(YEAR, user_dateNaissance, CURDATE()) AS user_age,
        DATE_FORMAT(user_dateNaissance, '%d/%m/%Y') as user_dateNaissance
        FROM Users 
        WHERE user_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};