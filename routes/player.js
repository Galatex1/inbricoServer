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

      let inserts = ["player.ID", reqPlayer];
     
      if( isNaN(parseInt(reqPlayer)) )
      {
          inserts = ["player.username", reqPlayer];
      }

      //let sql = "SELECT ID, username, center, (SELECT count(*) FROM map WHERE player_id = player.ID) as tilecount FROM player WHERE ?? = ?";
      let sql = "SELECT player.ID, player.username, player.center, (SELECT count(*) FROM map WHERE player_id = player.ID) as tilecount, (SELECT alliance.ID FROM alliance INNER JOIN members ON alliance.ID = members.alliance_id WHERE members.player = player.ID) as allianceID FROM player WHERE ?? = ? ";


      sql = mysql.format(sql, inserts);

     DB.query(sql, null,function(data){
      res.json(data);
     });

     
         
  });

  app.get('/player/:name/ID', function(req, res){   
  
    const reqPlayer = req.params['name'];
   
    let sql = "SELECT ID FROM player WHERE username = ?";
    const inserts = [reqPlayer];
    sql = mysql.format(sql, inserts);

    DB.query(sql, null, function(result){
      res.json(result);  
    });

  });

  app.get('/player/:name/center', function(req, res){   
  
    const reqPlayer = req.params['name'];
   
    let sql = "SELECT center FROM player WHERE username = ?";
    const inserts = [reqPlayer];
    sql = mysql.format(sql, inserts);

    DB.query(sql, null, function(result){
      res.json(result);  
    });

  });

  app.get('/player/:name/tileCount', function(req, res){   
  
    const reqPlayer = req.params['name'];
   
    let sql = "SELECT (SELECT count(*) FROM map WHERE player_id = player.ID) as tilecount FROM player WHERE username = ?";
    const inserts = [reqPlayer];
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

    let inserts = ["player.ID", reqPlayer];
   
    if( isNaN(parseInt(reqPlayer)) )
    {
        inserts = ["player.username", reqPlayer];
    }


    let sql = "SELECT wood, stone, iron, gold, max FROM storage INNER JOIN player ON player.ID = player_id WHERE ?? = ?";

    sql = mysql.format(sql, inserts);

    DB.query(sql, null, function(result){
      res.json(result);  
    });

  });

}