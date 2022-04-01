var db = require("../config/database");
module.exports = {
    // lister profs ----------------------------------------------------------------------------------------------
    lister: function(callback) {
        var sql = `SELECT *,
        TIMESTAMPDIFF(YEAR, user_dateNaissance, CURDATE()) AS user_age,
        DATE_FORMAT(user_dateNaissance, '%d/%m/%Y') as user_dateNaissance
        FROM Users
        WHERE user_isProf = 1
        AND user_isProviseur = 0 
        AND user_isAdministration = 0
        ORDER BY user_nom, user_prenom`;
        db.query(sql, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ajouter un prof ----------------------------------------------------------------------------------------------
    ajouter: function(params, callback) {
        var sql = `INSERT INTO Users 
        (user_nom, user_prenom, user_mdp, user_dateNaissance, user_sexe, user_tel, user_mail, user_isProf)
        VALUES (?,?,?,?,?,?,?, 1)`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // modifier un prof ----------------------------------------------------------------------------------------------
    modifier: function(params, callback) {
        var sql = `UPDATE Users 
        SET user_nom = ?,
        user_prenom = ?,
        user_dateNaissance = ?, 
        user_sexe = ?, 
        user_tel = ?, 
        user_mail = ?
        WHERE user_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // zsupprimer un prof ----------------------------------------------------------------------------------------------
    supprimer: function(params, callback) {
        var sql = `DELETE FROM Users WHERE user_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ficher un prof ----------------------------------------------------------------------------------------------
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