const express = require('express');
const app = express();
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "inbrico"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected to DB!");
});

//new commit 

app.use(express.urlencoded());
app.use(express.json());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(8000, () => {
  console.log('Server started!');
});

app.route('/api/cats/:name').get((req, res) => {
  const requestedCatName = req.params['name'];
  
        let sql = "SELECT * FROM player";

    conn.query(sql, function (err, result) {
        if (err)
        {
            console.log("error: " + result);
        }
        else 
        {            
                result.forEach(function(item, index){
                   console.log("username: ", item.username);
                });
        }   
    });
  
  res.send({ name: requestedCatName+"whatever" });
});

app.post('/',function(request,response, next){});

app.post('/login',function(request,response, next){
    
    
    console.log(request.body.username);
    let sql = "SELECT * FROM player WHERE username ='"+request.body.username+"'";
    conn.query(sql, function (err, result) {
        //console.log(result);
        if (err)
        {
            console.log("error: " + err);
        }
        else 
        {            
            if(result.length === 1)
                response.json(result[0]); 
            else 
               response.json({error: "Wrong username or password"}); 
        }   
    });
    
    
    
});


app.post('/map',function(request,response, next){
    
    let player_ID = request.body.ID;
    let tilesX = 10;
    let tilesY = 10;
    
    let sql = "SELECT Type_ID, X, Y, Player_ID, player.username, (SELECT X FROM Map JOIN player ON Map.ID = player.center WHERE player.ID = "+player_ID+") as subX,"
                    + "(SELECT Y FROM Map JOIN player ON Map.ID = player.center WHERE player.ID = "+player_ID+") as subY "
                    + "FROM Map LEFT JOIN player ON Map.Player_ID = player.ID HAVING (Map.X BETWEEN (subX - "+tilesX+") AND (subX + "+tilesX+")) AND (Map.Y BETWEEN (subY - "+tilesY+" ) AND (subY + "+tilesY+")) ORDER BY Y, X";
    
    conn.query(sql, function (err, result) {
       // console.log(result);
        if (err)
        {
            console.log("error: " + err);
        }
        else 
        {               
            response.json(result);
        }   
    });
    
    
    
});


app.get('/', function(req, res){
   
   
      // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
   
    console.log("GET CALLED");
    res.send("HELLO WORLD");
    
});
