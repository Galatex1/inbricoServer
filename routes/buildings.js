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

      app.get('/building/:hex', function(req, res){   

        const hex = req.params['hex'];

    
        getNextBuilding(hex).then((result)=>{
          res.json(result); 
        })
    
      });

      app.get('/queue/:hex/:player', function(req, res){   

        const hexID = req.params['hex'];
        const playerID = req.params['player'];
    
        upgradeBuilding(hexID, playerID).then((result)=>{
          res.json(result); 
        })
    
      });

      app.get('/queue/:hex/:player/:build', function(req, res){   

        const hexID = req.params['hex'];
        const playerID = req.params['player'];
        const build = req.params['build'];
    
        chooseBuilding(hexID, playerID, build).then((result)=>{
            
            upgradeBuilding(hexID, playerID).then((result)=>{
                res.json(result); 
            }) 
        })
    
      });

      app.get('/queue/:player', function(req, res){   

        const player = req.params['player'];
    
        getQueue(player).then((result)=>{
          res.json(result); 
        })
    
      });


        function getNextBuilding(hexID){
        
        return new Promise(function(resolve, reject) {
    
            getTile(hexID, 0, 0).then((tile)=>{

                isUpgrading(hexID).then((res)=>{

                    let uplevel = tile[0]['level']+1;
                    if(res.length == 1)
                        uplevel = res[0]['level']+1;
    
                    let storage = "SELECT id, name, level, wood, stone, iron, gold, time FROM costs INNER JOIN buildings ON buildings.id = build_id WHERE buildings.id = ? AND level = ?";
                    let inserts = [tile[0]['build'], uplevel];
            
                    storage = mysql.format(storage, inserts);
              
                    DB.query(storage, null, function(result){
                      resolve(result);  
                    });
    
                })

            })
    
        })
    
      }
    
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

      function updatePlayerResources(player_id, woodDiff, stoneDiff, ironDiff, goldDiff)
      {
        return new Promise(function(resolve, reject) {
    
    
            let inserts = [woodDiff, stoneDiff, ironDiff, goldDiff, woodDiff, stoneDiff, ironDiff, goldDiff, player_id];
                               
            let sql = "UPDATE storage SET wood = wood - ?, stone = stone - ?, iron = iron - ?, gold = gold - ? WHERE (wood - ?) >= 0 AND (stone - ?) >= 0 AND (iron - ?) >= 0 AND (gold - ?) >= 0 AND  player_id = ? ";
        
            sql = mysql.format(sql, inserts);
    
            DB.query(sql, null, function(result){             
                resolve(result.affectedRows);  
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

    function chooseBuilding(hexID, playerID, build){
        
        return new Promise(function(resolve, reject) {
    
    
            let inserts = [build, playerID, hexID];  
                            
            let sql = "UPDATE map SET build = ?, level = 0 WHERE player_id = ? AND ID =  ?";
        
            sql = mysql.format(sql, inserts);
    
            DB.query(sql, null, function(result){             
                resolve(result);  
            });
    
        })

    }

    function isUpgrading(hexID){
        return new Promise(function(resolve, reject) {
            
            let inserts = [hexID];
                            
            let sql = "SELECT level FROM building_queue WHERE tile_id = ? ORDER BY level DESC LIMIT 1 ";
        
            sql = mysql.format(sql, inserts);
    
            DB.query(sql, null, function(result){            
                resolve(result);  
            });

        })
    }


        function getLastItem(playerID){
            return new Promise(function(resolve, reject) {

                let sql = "SELECT complete FROM building_queue WHERE player_id = ? ORDER BY complete DESC LIMIT 1";
        
                let inserts = [playerID];
        
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
                        isUpgrading(hexID).then((QueueLevel)=>{
                            
                            let uplevel = (result[0]['level']+1);
                            if(QueueLevel.length == 1)
                                uplevel = QueueLevel[0]['level']+1;

                            console.log("level:", uplevel);

                            getBuilding(result[0]['build'], uplevel).then((res) =>{               
                        
                                updatePlayerResources(playerID, res[0]['wood'], res[0]['stone'], res[0]['iron'], res[0]['gold']).then((val)=>{
                                        getLastItem(playerID).then((last)=>{
                                                                               
                                            if(val > 0)
                                            {
                                                let sql;
                                                let inserts;
                                                
                                                if(last.length == 0)
                                                {
                                                    sql = "INSERT INTO building_queue (player_id, tile_id, build, level, complete, start) VALUE(?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL TIME_TO_SEC(?) SECOND), NOW())";
                                                    inserts = [playerID, hexID, result[0]['build'], res[0]['level'], res[0]['time']]; 
                                                }
                                                else
                                                {
                                                    sql = "INSERT INTO building_queue (player_id, tile_id, build, level, complete, start) VALUE(?, ?, ?, ?, DATE_ADD(?, INTERVAL TIME_TO_SEC(?) SECOND), ?)";                   
                                                    inserts = [playerID, hexID, result[0]['build'], res[0]['level'], last[0]['complete'], res[0]['time'], last[0]['complete']];
                                                }
                                        
                                                sql = mysql.format(sql, inserts);
                                        
                                                DB.query(sql, null, function(result){
                                                    resolve(result);  
                                                });
                                            }
                                            else
                                                resolve("Not Enough Resources");

                                        })
                                })
        
                            });

                        })
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

            let sql = "SELECT name, player_id, tile_id, build, level, start, complete, queued, TIME_TO_SEC(TIMEDIFF(complete, start)) as time, TIME_TO_SEC(TIMEDIFF(complete, NOW())) as remain FROM building_queue LEFT JOIN player ON player_id = player.ID LEFT JOIN buildings ON buildings.id = build WHERE ?? = ? ORDER BY complete ASC";

            let inserts = transformPlayer(player);
    
            sql = mysql.format(sql, inserts);
    
            DB.query(sql, null, function(result){
                resolve(result);  
            });
        })
    }


}