var mysql   = require("mysql");

var pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
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
                    if(conn)
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
                if(conn)
                    conn.release();
                callback(null, err);
                console.log(err);
                //throw err;
            }

            var q = conn.query(query, params, function (err, rows) {
               
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);            
                }
                
                if(conn)
                    conn.release();
            });

            q.on('error', function (err) {
                
                callback(null, err);
                if(conn)
                    conn.release();

                    console.log(err);
                    //throw err;
            });
        });
    };

    return {
        query: _query,
        perRow: _perRow

    };
})();

module.exports = DB;
