const DB = require('../database.js');
const mysql   = require("mysql");

module.exports = function(app){

    app.get('/map/load/:player',function(request,response){

        let player_ID  = request.params['player'];
        const tilesX = request.query['x'] ? request.query['x'] : 0;
        const tilesY = request.query['y'] ? request.query['y'] : 0;
        let inserts = ["player.ID", player_ID, "player.ID", player_ID, tilesX, tilesX, tilesY, tilesY];

        if( isNaN(parseInt(player_ID)))
        {
            inserts = ["player.username", player_ID, "player.username", player_ID, tilesX, tilesX, tilesY, tilesY];
        }

        sql = "SELECT map.ID, type_id, x, y, player_id, player.username, (SELECT x FROM map JOIN player ON map.ID = player.center WHERE ?? = ?) as subX, (SELECT y FROM map JOIN player ON Map.ID = player.center WHERE ?? = ?) as subY FROM map LEFT JOIN player ON map.player_id = player.ID HAVING (map.x BETWEEN (subX - ?) AND (subX + ?)) AND (map.y BETWEEN (subY - ? ) AND (subY + ?)) ORDER BY y, x";   
        
        sql = mysql.format(sql, inserts);
        
        DB.query(sql, null,function(result){ 
            response.json(result);
        });

        
    });

    let index = 0;

    app.get('/map/tiles',function(request,response, next){
    
    let first = request.query.which ? request.query.which : "y";
    let second = first == "x" ?  "y" : "x";
    let value = request.query.value ? request.query.value : 0;
    let from = request.query.from ? request.query.from : parseInt(value);
    let to = request.query.to ? request.query.to : parseInt(value);
    let slice = request.query.slice ? request.query.slice : false;

    let inserts = [first, value, second, from, to];
                    
    let sql = "SELECT map.ID, type_id, x, y, player_id, player.username FROM map LEFT JOIN player ON map.player_id = player.ID WHERE ?? = ? AND (?? BETWEEN ? AND ?)  ORDER BY y, x";

    sql = mysql.format(sql, inserts);

    DB.query(sql, null, function(result){
        console.log("Sending tiles", index);
        index++;
        response.json(result);  
    });
    
    
    
    });

    app.get('/map/tile',function(request,response, next){
    
        let ID = request.query.id ? request.query.id : 0;
        let x = request.query.x ? request.query.x : 0;
        let y = request.query.y ? request.query.y : 0;

        let inserts = ["map.ID", ID, "map.ID", ID];

        if(ID == 0)
            inserts = ["map.x", x, "map.y", y];
                        
        let sql = "SELECT map.ID, type_id, x, y, player_id, player.username FROM map LEFT JOIN player ON map.player_id = player.ID WHERE ?? = ? AND ?? =  ? LIMIT 1";
    
        sql = mysql.format(sql, inserts);

        DB.query(sql, null, function(result){
            response.json(result);  
        });
 
    });



}