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
        DATE_FORMAT(eval_date, '%d/%m/%Y') as eval_date,
        DATE_FORMAT(eval_date, '%m') as eval_month
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
        GROUP BY cursus_id
        ORDER BY matiere_id `;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};

