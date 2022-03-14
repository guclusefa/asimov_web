var db = require("../config/database");
module.exports = {
    // page d'accueil
    lister: function(callback) {
        var sql = `SELECT *,
        TIMESTAMPDIFF(YEAR, user_dateNaissance, CURDATE()) AS user_age,
        DATE_FORMAT(user_dateNaissance, '%d/%m/%Y') as user_dateNaissance
        FROM Users 
        WHERE user_isProf = 0 
        AND user_isProfPrincipal = 0 
        AND user_isProviseur = 0 
        AND user_isAdministration = 0
        ORDER BY user_nom, user_prenom`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ajouter: function(params, callback) {
        var sql = `INSERT INTO Users (user_nom, user_prenom, user_mdp, user_dateNaissance, user_sexe, user_tel, user_mail) VALUES (?,?,?,?,?,?,?)`;
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