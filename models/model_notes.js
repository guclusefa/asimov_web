var db = require("../config/database");
module.exports = {
    // select dernier evals
    ficherNotesEleves: function (params, callback) {
        var sql = `SELECT * FROM Evaluations ORDER BY eval_id DESC LIMIT 1;`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ficherNotesProfs: function (params, callback) {
        var sql = `SELECT * FROM Evaluations ORDER BY eval_id DESC LIMIT 1;`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },


    ficherNotesClasses: function (params, callback) {
        var sql = `SELECT * FROM Evaluations ORDER BY eval_id DESC LIMIT 1;`;
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};

