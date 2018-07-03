const DB = require('../database.js');
const mysql   = require("mysql");


module.exports = function(app){

    app.get('/building/:ID/:level', function(req, res){   

        const reqID = req.params['ID'];
        const reqlevel = req.params['level'];
    
        getBuilding(reqID, reqlevel).then((result)=>{
          res.json(result); 
        })
    
      });

      app.get('/queue/:hex/:player', function(req, res){   

        const hexID = req.params['hex'];
        const playerID = req.params['player'];
        const build = req.params['build'];
        const level = req.params['level'];
    
        upgradeBuilding(hexID, playerID).then((result)=>{
          res.json(result); 
        })
    
      });

      app.get('/queue/:player', function(req, res){   

        const player = req.params['player'];
    
        getQueue(player).then((result)=>{
          res.json(result); 
        })
    
      });
    
    
      function getBuilding(build, level){
        
        return new Promise(function(resolve, reject) {
    
    
            let storage = "SELECT id, name, level, wood, stone, iron, gold, time FROM costs INNER JOIN buildings ON buildings.id = build_id WHERE buildings.id = ? AND level = ?";
            let inserts = [build, level];
    
            storage = mysql.format(storage, inserts);
      
            DB.query(storage, null, function(result){
              resolve(result);  
            });
    
        })
    
      }

      function getTile(ID, x, y){
        
        return new Promise(function(resolve, reject) {
    
    
            let inserts = ["map.ID", ID, "map.ID", ID];
    
            if(ID == 0)
                inserts = ["map.x", x, "map.y", y];
                            
            let sql = "SELECT player_id, build, level FROM map LEFT JOIN player ON map.player_id = player.ID WHERE ?? = ? AND ?? =  ? LIMIT 1";
        
            sql = mysql.format(sql, inserts);
    
            DB.query(sql, null, function(result){             
                resolve(result);  
            });
    
        })

    }

      function upgradeBuilding(hexID, playerID){
        
        return new Promise(function(resolve, reject) {

            getTile(hexID, 0, 0).then((result)=>{

                if(result[0]['player_id'] == playerID)
                 {
                        getBuilding(result[0]['build'], result[0]['level']).then((res) =>{


                        let sql = "INSERT INTO building_queue (player_id, tile_id, build, level, complete) VALUE(?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL TIME_TO_SEC(?) SECOND))";

                        let inserts = [playerID, hexID, result[0]['build'], (res[0]['level']+1), res[0]['time']];
                
                        sql = mysql.format(sql, inserts);
                
                        DB.query(sql, null, function(result){
                            resolve(result);  
                        });
            
        
        
                    });
                }
                else
                    resolve("This user can't build there");

            })
    

            
        })
    
      }

      function transformPlayer(player){

        let inserts = ["player.ID", player];
         
        if( isNaN(parseInt(player)) )
        {
            inserts = ["player.username", player];
        }
    
        return inserts;
      }

      function getQueue(player){
        
        return new Promise(function(resolve, reject) {

            let sql = "SELECT name, player_id, tile_id, build, level, complete, queued, TIME_TO_SEC(TIMEDIFF(complete, queued)) as time, TIME_TO_SEC(TIMEDIFF(complete, NOW())) as remain FROM building_queue LEFT JOIN player ON player_id = player.ID LEFT JOIN buildings ON buildings.id = build WHERE ?? = ?";

            let inserts = transformPlayer(player);
    
            sql = mysql.format(sql, inserts);
    
            DB.query(sql, null, function(result){
                resolve(result);  
            });
        })
    }


}