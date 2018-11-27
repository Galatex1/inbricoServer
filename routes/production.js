const DB = require('../database.js');
const mysql   = require("mysql");

module.exports = function(app){


    app.get('/production/:type', function(req, res){   
  
        const type = req.params['type'];

        getProduction(type).then((result)=>{
          res.json(result); 
        })
    
      });

      app.get('/production/:type/:level', function(req, res){   
  
        const type = req.params['type'] ? req.params['type'] : 3;
        const level = req.params['level'] ? req.params['level'] : 1;
        
        getProductionLevel(type, level).then((result)=>{
          res.json(result); 
        })
    
      });

      app.get('/workers/:player', function(req, res){   
  
        let reqPlayer = req.params['player'];

        let current = getCurrentWorkers(reqPlayer);

        let max = getMaxWorkers(reqPlayer);

        Promise.all([current, max]).then((result)=>{
          res.json(result); 
        })
    
      });

      function getProduction(type){
    
        return new Promise(function(resolve, reject) { 
          
          let sql = "SELECT level, production, workers FROM production WHERE build_id = ?";
    
          const inserts = [type];
          sql = mysql.format(sql, inserts);
      
          DB.query(sql, null, function(result){
            resolve(result);  
          });
    
        });
      
      };

      function getProductionLevel(type, level){
    
        return new Promise(function(resolve, reject) { 
          
          let inserts = transformPlayer(player);
      
      
          let sql = "SELECT level, production, workers FROM production WHERE build_id = ? AND level = ?";
  
          const inserts = [type, level];
          sql = mysql.format(sql, inserts);
      
          DB.query(sql, null, function(result){
          resolve(result);  
          });
    
        });
      
      };

      function getCurrentWorkers(player){
    
        return new Promise(function(resolve, reject) { 
          
          let inserts = [player];    
      
          let sql = "SELECT SUM(map.workers) as current FROM map WHERE player_id = ? AND build != 0 GROUP BY build ORDER BY build";
      
          sql = mysql.format(sql, inserts);
      
          DB.query(sql, null, function(result){
            resolve(result);  
          });
    
        });
      
      };


      function getMaxWorkers(player){
    
        return new Promise(function(resolve, reject) { 
          
          let inserts = [player];     
      
          let sql = "SELECT SUM(production.workers) as maximum FROM production INNER JOIN map ON production.level = map.level AND build_id = map.build WHERE  player_id = ? GROUP BY build_id ORDER BY build_id";
      
          sql = mysql.format(sql, inserts);
      
          DB.query(sql, null, function(result){
            resolve(result);  
          });
    
        });
      
      };


      function transformPlayer(player){

        let inserts = ["player.ID", player];
         
        if( isNaN(parseInt(player)) )
        {
            inserts = ["player.username", player];
        }
    
        return inserts;
      }

}