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

    app.get('/player/:name', function(req, res){   
  
      const reqPlayer = req.params['name'];

      let inserts = transformPlayer(reqPlayer);

      //let sql = "SELECT ID, username, center, (SELECT count(*) FROM map WHERE player_id = player.ID) as tilecount FROM player WHERE ?? = ?";
      let sql = "SELECT player.ID, player.username, player.center, (SELECT count(*) FROM map WHERE player_id = player.ID) as tilecount, (SELECT alliance.ID FROM alliance INNER JOIN members ON alliance.ID = members.alliance_id WHERE members.player = player.ID) as allianceID FROM player WHERE ?? = ? ";


      sql = mysql.format(sql, inserts);

     DB.query(sql, null,function(data){
      res.json(data);
     });

     
         
  });

  app.get('/player/:name/ID', function(req, res){   
  
    const reqPlayer = req.params['name'];

    let inserts = transformPlayer(reqPlayer);
   
    let sql = "SELECT ID FROM player WHERE ?? = ?";

    sql = mysql.format(sql, inserts);

    DB.query(sql, null, function(result){
      res.json(result);  
    });

  });

  app.get('/player/:name/center', function(req, res){   
  
    const reqPlayer = req.params['name'];

    let inserts = transformPlayer(reqPlayer);
   
    let sql = "SELECT center FROM player WHERE ?? = ?";

    sql = mysql.format(sql, inserts);

    DB.query(sql, null, function(result){
      res.json(result);  
    });

  });

  app.get('/player/:name/tileCount', function(req, res){   
  
    const reqPlayer = req.params['name'];

    let inserts = transformPlayer(reqPlayer);
   
    let sql = "SELECT (SELECT count(*) FROM map WHERE player_id = player.ID) as tilecount FROM player WHERE ?? = ?";

    sql = mysql.format(sql, inserts);

    DB.query(sql, null, function(result){
      res.json(result);  
    });

  });

  app.get('/player/:name/alliance', function(req, res){   
  
    const reqPlayer = req.params['name'];
    let sql = "SELECT alli.ID as alliance_ID FROM player LEFT JOIN (SELECT ID, alliance.name, alliance.abbreviation, members.player FROM alliance INNER JOIN members ON alliance.ID = members.alliance_id WHERE members.player = ID) as alli ON alli.player = alli.ID WHERE player.username = ? ";

    const inserts = [reqPlayer];
    sql = mysql.format(sql, inserts);

    DB.query(sql, null, function(result){
      res.json(result);  
    });

  });

  app.get('/player/:name/storage', function(req, res){   

    const reqPlayer = req.params['name'];

    getStorage(reqPlayer).then((result)=>{ 
      res.json(result); 
    });

  });

  app.get('/player/:name/population', function(req, res){   
    
    const reqPlayer = req.params['name'];

    getPopulation(reqPlayer).then((result)=>{
      res.json(result); 
    })

  });

  app.get('/player/:name/production', function(req, res){   

    const reqPlayer = req.params['name'];

    getProduction(reqPlayer).then((result)=>{
      res.json(result); 
    })

  });


  app.get('/player/:name/buildings', function(req, res){   

    const reqPlayer = req.params['name'];

    getBuildings(reqPlayer).then((result)=>{
      res.json(result); 
    })

  });

  app.post('/player/:name/production/save/', function(req, res){   

    const production = req.body.production;
    const reqPlayer = req.params['name'];

    Promise.all(saveProduction(reqPlayer, production)).then((result)=>{
      res.json(result); 
    })

  });



  function getBuildings(player){
        
    return new Promise(function(resolve, reject) {


        let sql = "SELECT build, name, product, map.level, ANY_VALUE(production), count(*) as count, ANY_VALUE(production.workers) as max, SUM(map.workers) as current FROM map INNER JOIN buildings ON buildings.id = build INNER JOIN production ON build_id = build AND map.level = production.level  WHERE player_id = ? GROUP BY  map.level, build ORDER BY build, map.level DESC";
        let inserts = [player];

        sql = mysql.format(sql, inserts);
  
        DB.query(sql, null, function(result){
          resolve(result);  
        });

    })

  }

  function saveProduction(player, production)
  {
    let _promises = [];

    production.forEach(p => {

      p.buildings.forEach(prod => {
          
        _promises.push(
              new Promise(function(resolve, reject) {

                let diff = prod.current % prod.count;
                let workers = Math.floor(prod.current / prod.count);

                let sql = "UPDATE map SET workers = ? WHERE player_id = ? AND build = ? AND level = ?";
                let inserts = [workers, player, prod.build, prod.level];
        
                if(diff != 0)
                {
                  sql = "UPDATE map SET workers = ? WHERE player_id = ? AND build = ? AND level = ?;UPDATE map SET workers = ? WHERE player_id = ? AND build = ? AND level = ? LIMIT 1;";
                  inserts = [workers, player, prod.build, prod.level, (workers+diff), player, prod.build, prod.level];
                }

                sql = mysql.format(sql, inserts);

                DB.query(sql, null, function(result){
                  resolve(result);  
                });

              })
          )

        });

    });

    return _promises;
  }


  function getStorage(player){
    
    return new Promise(function(resolve, reject) {

      updateStorage(player).then(()=>{

        let storage = "SELECT wood, stone, iron, gold, max, updated FROM storage INNER JOIN player ON player.ID = player_id WHERE ?? = ?";
        let inserts = transformPlayer(player);

        storage = mysql.format(storage, inserts);
  
        DB.query(storage, null, function(result){
          resolve(result);  
        });

      })

    })

  }

  function updateStorage(player){
    
    return new Promise(function(resolve, reject) {
  
     var timeDiff = getTimeDiff(player);
     var production = getProduction(player);


     return Promise.all([timeDiff, production]).then(([tDiff, prod]) => {

          
          let timeDiff = tDiff[0]['TimeDiff'];
  
          let wood =  (timeDiff/3600) * prod[0]['perSec'];
          let stone =  (timeDiff/3600) * prod[1]['perSec'];
          let iron =  (timeDiff/3600) * prod[2]['perSec'];
          let gold =  (timeDiff/3600) * prod[3]['perSec'];

          let values = [wood, wood, stone, stone, iron, iron, gold, gold];
          values = values.concat(transformPlayer(player));

          let update = "UPDATE storage INNER JOIN player ON player.ID = player_id SET "
          +"wood = IF((wood + ?) < max, wood + ?, max), "
          +"stone = IF((stone + ?) < max, stone + ?, max), "
          +"iron = IF((iron + ?) < max, iron + ?, max), "
          +"gold = IF((gold + ?) < max, gold + ?, max) WHERE ?? = ?";

          update = mysql.format(update, values);

     
          DB.query(update, null, function(res){

            resolve();

          });
          
     })
    
    });
  
  };

  function getTimeDiff(player){
    
    return new Promise(function(resolve, reject) { 

      let inserts = transformPlayer(player);
  
  
      let sql = "SELECT TIMESTAMPDIFF( SECOND, storage.updated, CURRENT_TIMESTAMP() ) as TimeDiff, max FROM storage INNER JOIN player ON player.ID = player_id WHERE ?? = ?"; 
  
      sql = mysql.format(sql, inserts);

      DB.query(sql, null, function(tDiff){ 
        resolve(tDiff);
      });

    });

  };

  function getPopulation(player){
    
    return new Promise(function(resolve, reject) { 
      
      let inserts = transformPlayer(player);
  
  
      let sql = "SELECT SUM(population) as population FROM map INNER JOIN player ON player.ID = player_id WHERE ?? = ?";
  
      sql = mysql.format(sql, inserts);
  
      DB.query(sql, null, function(result){
        resolve(result);  
      });

    });
  
  };

  function getProduction(player){
    
    return new Promise(function(resolve, reject) {

      const reqPlayer = player;

      let inserts = ["player.ID", reqPlayer,"player.ID", reqPlayer,"player.ID", reqPlayer,"player.ID", reqPlayer];
    
      if( isNaN(parseInt(reqPlayer)) )
      {
          inserts = ["player.username", reqPlayer,"player.username", reqPlayer,"player.username", reqPlayer,"player.username", reqPlayer];
      }


      let sql = "SELECT SUM(production.production * map.workers) as perSec FROM map INNER JOIN production ON build_id = map.build AND production.level = map.level INNER JOIN player ON player.ID = player_id WHERE ?? = ? AND (build = 1 OR build = 7) "
      + "UNION ALL "
      + "SELECT SUM(production.production * map.workers) as ironPerSec FROM map INNER JOIN production ON build_id = map.build AND production.level = map.level INNER JOIN player ON player.ID = player_id WHERE ?? = ? AND (build = 3 OR build = 7) "
      + "UNION ALL "
      + "SELECT SUM(production.production * map.workers) as stonePerSec FROM map INNER JOIN production ON build_id = map.build AND production.level = map.level INNER JOIN player ON player.ID = player_id WHERE ?? = ? AND (build = 4 OR build = 7) "
      + "UNION ALL "
      + "SELECT SUM(production.production * map.workers) as goldPerSec FROM map INNER JOIN production ON build_id = map.build AND production.level = map.level INNER JOIN player ON player.ID = player_id WHERE ?? = ? AND (build = 5 OR build = 7) ";

      sql = mysql.format(sql, inserts);

      DB.query(sql, null, function(result){
        resolve(result);  
      });

    });

  }

  function transformPlayer(player){

    let inserts = ["player.ID", player];
     
    if( isNaN(parseInt(player)) )
    {
        inserts = ["player.username", player];
    }

    return inserts;
  }




}