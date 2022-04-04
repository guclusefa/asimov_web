var db = require("../config/database");
module.exports = {
    // slister les classes d'un eleve ----------------------------------------------------------------------------------------------
    lesClassesEleves: function (params, callback) {
        var sql = `SELECT * FROM Cursus_Eleves, Cursus, Classes WHERE cursus_eleve_idCursus = cursus_id AND cursus_idClasse = classe_id AND cursus_eleve_idEleve = ?`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // lister les notes d'un eleves ----------------------------------------------------------------------------------------------
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

    // lister les matieres d'un eleve ----------------------------------------------------------------------------------------------
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

    // lister les moyennes d'un eleve ----------------------------------------------------------------------------------------------
    getMoyenneEleve: function (params, callback) {
        var sql = `SELECT avg(note_valeur) as avg_eleve, eval_trimestre 
        FROM Notes, Evaluations 
        WHERE note_idEval = eval_id 
        AND note_idEleve = ? 
        AND eval_idCursus = ? 
        GROUP BY note_idEleve, eval_trimestre`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // lister les moyenne d'une classe ----------------------------------------------------------------------------------------------
    getMoyenneClasse: function (params, callback) {
        var sql = `SELECT avg(note_valeur) as avg_classe, eval_trimestre 
        FROM Notes, Evaluations 
        WHERE note_idEval = eval_id 
        AND eval_idCursus = ? 
        GROUP BY eval_idCursus, eval_trimestre;`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // lister les omyenne d'une matiere ----------------------------------------------------------------------------------------------
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

    // lister min des evzal ----------------------------------------------------------------------------------------------
    getMinEval: function (callback) {
        var sql = `SELECT min(note_valeur) as min, note_idEval FROM Notes GROUP BY note_idEval;`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // mister max des evazl ----------------------------------------------------------------------------------------------
    getMaxEval: function (callback) {
        var sql = `SELECT max(note_valeur) as max, note_idEval FROM Notes GROUP BY note_idEval;`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    // lister les moy eval ----------------------------------------------------------------------------------------------
    getAvgEval: function (callback) {
        var sql = `SELECT avg(note_valeur) as avg, note_idEval FROM Notes GROUP BY note_idEval;`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    /* in progress */
    // lister les moyennes annuel ----------------------------------------------------------------------------------------------
    getLesMoyennesAnnuel: function (params, callback) {
        var sql = `SELECT avg(note_valeur) as avg, note_idEleve, eval_idMatiere
        FROM Evaluations, Notes WHERE note_idEval = eval_id 
        AND eval_idCursus = ? 
        AND note_valeur IS NOT NULL
        GROUP BY eval_idMatiere, note_idEleve;`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};

