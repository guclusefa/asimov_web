var db = require("../config/database");
module.exports = {
    // select dernier evals
    lesClassesEleves: function (params, callback) {
        var sql = `SELECT * FROM Cursus_Eleves, Cursus, Classes WHERE cursus_eleve_idCursus = cursus_id AND cursus_idClasse = classe_id AND cursus_eleve_idEleve = ?`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    lesNotesEleves: function (params, callback) {
        var sql = `SELECT *,
        DATE_FORMAT(eval_date, '%d/%m/%Y') as eval_date
        FROM Notes, Evaluations, Cursus, Users, Matieres 
        WHERE note_idEval = eval_id 
        AND eval_idCursus = cursus_id 
        AND eval_idProf = user_id 
        AND eval_idMatiere = matiere_id
        AND note_idEleve = ?
        AND cursus_id = ?
        ORDER BY matiere_id `;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    lesMatieresEleves: function (params, callback) {
        var sql = `SELECT *,
        DATE_FORMAT(eval_date, '%d/%m/%Y') as eval_date
        FROM Notes, Evaluations, Cursus, Users, Matieres 
        WHERE note_idEval = eval_id 
        AND eval_idCursus = cursus_id 
        AND eval_idProf = user_id 
        AND eval_idMatiere = matiere_id
        AND note_idEleve = ?
        AND cursus_id = ?
        GROUP BY matiere_id
        ORDER BY matiere_id `;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    getLesAvgMatiere: function (params, callback) {
        var sql = `SELECT avg(note_valeur) as leAvg, note_idEleve, eval_trimestre, eval_idMatiere 
        FROM Evaluations, Notes WHERE  note_idEval = eval_id 
        AND eval_idCursus = ?
        GROUP BY note_idEleve, eval_trimestre, eval_idMatiere
        ORDER BY eval_idMatiere`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    getMinEval: function (callback) {
        var sql = `SELECT min(note_valeur) as min, note_idEval FROM Notes GROUP BY note_idEval;`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    getMaxEval: function (callback) {
        var sql = `SELECT max(note_valeur) as max, note_idEval FROM Notes GROUP BY note_idEval;`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    getAvgEval: function (callback) {
        var sql = `SELECT avg(note_valeur) as avg, note_idEval FROM Notes GROUP BY note_idEval;`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};

