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

    ajouterNotes: function(params, callback) {
        var sql = `INSERT INTO Notes (note_valeur, note_idEval, note_idEleve) VALUES (?,?,?)`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },


    supprimerNotes: function(params, callback) {
        var sql = `DELETE FROM Notes WHERE note_idEval = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // ne peuvent pas modifier matiere, prof ou curusus pck flemme faut prendre en compte trop de trucs ils ont qu'a recrer une éval
    modifier: function(params, callback) {
        var sql = `UPDATE Evaluations 
        SET eval_desc = ?,
        eval_date = ?
        WHERE eval_id = ? `;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    supprimer: function(params, callback) {
        var sql = `DELETE FROM Evaluations WHERE eval_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ficher: function(params, callback) {
        var sql = `SELECT *,
        DATE_FORMAT(user_dateNaissance, '%d/%m/%Y') as eval_date
        FROM Evaluations, Cursus, Users, Matieres, Classes
        WHERE eval_idCursus = cursus_id
        AND eval_idProf = user_id
        AND eval_idMatiere = matiere_id
        AND cursus_idClasse = classe_id
        AND eval_id = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ficherEleves: function(params, callback) {
        var sql = `SELECT *
        FROM Cursus_Eleves, Users
        WHERE cursus_eleve_idEleve = user_id
        AND cursus_eleve_idCursus = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ficherNotesEleves: function(params, callback) {
        var sql = `SELECT *
        FROM Notes
        WHERE note_idEval = ?`;
        db.query(sql, params, function(err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};