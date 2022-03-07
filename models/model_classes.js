var db = require("../config/database");
module.exports = {
    // lister les classes
    lister: function (callback) {
        var sql = "SELECT * FROM Classes";
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};
