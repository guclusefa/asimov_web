var db = require("../config/database");
module.exports = {
    // lister les eleves ----------------------------------------------------------------------------------------------
    lister: function (callback) {
        var sql = `SELECT *,
        TIMESTAMPDIFF(YEAR, user_dateNaissance, CURDATE()) AS user_age,
        DATE_FORMAT(user_dateNaissance, '%d/%m/%Y') as user_dateNaissance
        FROM Users 
        WHERE user_isProf = 0 
        AND user_isProviseur = 0 
        AND user_isAdministration = 0
        AND user_isResponsable = 0
        ORDER BY user_nom, user_prenom`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },


    listerLast: function (callback) {
        var sql = `SELECT user_id
        FROM Users
        ORDER BY user_id DESC
        LIMIT 1`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ajouter les eleve ----------------------------------------------------------------------------------------------
    ajouter: function (params, params2, params3, callback) {
        // ajout eleve
        var sql = `INSERT INTO Users (user_nom, user_prenom, user_mdp, user_dateNaissance, user_sexe, user_tel, user_mail) VALUES (?,?,?,?,?,?,?)`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;

            // requete resp
            var sql2 = `INSERT INTO responsables (resp_idResp, resp_idEleve) VALUES (?,?)`;

            // ajouter resp 1 si n'est pas vide
            if (params2[0] != "") {
                db.query(sql2, params2, function (err, data) {
                    if (err) throw err;
                });
            }

            // ajouter resp 2 si n'est pas vide
            if (params3[0] != "") {
                db.query(sql2, params3, function (err, data) {
                    if (err) throw err;
                });
            }

            return callback(data);
        });
    },

    // modifier les eleves ----------------------------------------------------------------------------------------------
    modifier: function (params, callback) {
        var sql = `UPDATE Users 
        SET user_nom = ?,
        user_prenom = ?,
        user_dateNaissance = ?, 
        user_sexe = ?, 
        user_tel = ?, 
        user_mail = ?
        WHERE user_id = ? `;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // supprier les elevesq ----------------------------------------------------------------------------------------------
    supprimer: function (params, callback) {
        var sql = `DELETE FROM Users WHERE user_id = ?`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ficher les eleves ----------------------------------------------------------------------------------------------
    ficher: function (params, callback) {
        var sql = `SELECT *,
        TIMESTAMPDIFF(YEAR, user_dateNaissance, CURDATE()) AS user_age,
        DATE_FORMAT(user_dateNaissance, '%d/%m/%Y') as user_dateNaissance
        FROM Users 
        WHERE user_isProf = 0 
        AND user_isProviseur = 0 
        AND user_isAdministration = 0
        AND user_id = ?`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};