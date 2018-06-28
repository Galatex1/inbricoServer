const DB = require('../database.js');
const mysql   = require("mysql");

module.exports = function(app){


    app.get('/production/:type', function(req, res){   
  
        const type = req.params['type'];
        let sql = "SELECT level, production, workers FROM production WHERE type_id = ?";
    
        const inserts = [type];
        sql = mysql.format(sql, inserts);
    
        DB.query(sql, null, function(result){
          res.json(result);  
        });
    
      });

      app.get('/production/:type/:level', function(req, res){   
  
        const type = req.params['type'] ? req.params['type'] : 3;
        const level = req.params['level'] ? req.params['level'] : 1;
        let sql = "SELECT level, production, workers FROM production WHERE type_id = ? AND level = ?";
    
        const inserts = [type, level];
        sql = mysql.format(sql, inserts);
    
        DB.query(sql, null, function(result){
          res.json(result);  
        });
    
      });

}