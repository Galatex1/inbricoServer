const DB = require('../database.js');
const mysql   = require("mysql");

// function getResults(sql, onResult = null, onError = null, onComplete = null, onFields = null){
    
//     let result = [];

//     DB.query(sql, null)
//     .on('result', function(row, index){
//       onResult(row, index);
//       result.push(row);
//     })
//     .on('error', onError)
//     .on('end', function(){
//       onComplete();
//       return result; 
//     })
//     .on('fields', onFields);
// }

module.exports = function(app){


    app.get('/alliance/:ID', function(req, res){   
  
        const alli = req.params['ID'];
        let sql = "SELECT ID, name, abbreviation as short, (SELECT COUNT(*) FROM members WHERE alliance_id = ID) as members FROM alliance WHERE ID = ?";
    
        const inserts = [alli];
        sql = mysql.format(sql, inserts);
    
        DB.query(sql, null, function(result){
          res.json(result);  
        });
    
      });

}