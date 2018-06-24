var mysql   = require("mysql");

var pool = mysql.createPool({
    connLimit : 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "inbrico"
});


var DB = (function(){
    function _perRow() {
        var queryArgs = Array.prototype.slice.call(arguments),
            events = [],
            eventNameIndex = {};

        pool.getConnection(function (err, conn) {
            if (err) {
                if (eventNameIndex.error) {
                    eventNameIndex.error();
                }
            }
            if (conn) { 
                var q = conn.query.apply(conn, queryArgs);

                q.on('end', function () {
                    conn.release();
                });

                events.forEach(function (args) {
                    q.on.apply(q, args);
                });
            }
        });

        return {
            on: function (eventName, callback) {

                events.push(Array.prototype.slice.call(arguments));             
                eventNameIndex[eventName] = callback;
                return this;
            }
        };
    }

    function _query(query, params, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                conn.release();
                callback(null, err);
                throw err;
            }

            var q = conn.query(query, params, function (err, rows) {
                conn.release();
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);
                }

            });

            q.on('error', function (err) {
                conn.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query,
        perRow: _perRow

    };
})();

module.exports = DB;