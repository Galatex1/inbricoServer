const express = require('express');
const app = express();
const mysql   = require("mysql");
var DB = require('./database.js');


const cors = require('cors');


    DB.perRow("SELECT ID FROM player LIMIT 1", null)
    .on('result', function(result){
        console.log("Connection to database successful");
    })
    .on('error', function(err){
        console.log("error: " + err); 
    })



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(express.urlencoded());
app.use(express.json());
app.use(cors(corsOptions));
// app.use(function(req, res, next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });


app.listen(8000, () => {
  console.log('Server started!');
});

app.post('/',function(request,response, next){});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/login',function(request,response, next){
    
    var waitTill = new Date(new Date().getTime() + 0.5 * 1000);
    while(waitTill > new Date()){}

    let inserts = ["player.username", request.body.username];

    //let sql = "SELECT ID, username, password, center, (SELECT count(*) FROM map WHERE player_id = player.ID) as tilecount FROM player WHERE username ='"+request.body.username+"'";
    let sql = "SELECT player.ID, player.username, player.center, (SELECT count(*) FROM map WHERE player_id = player.ID) as tilecount, alli.ID as allianceID FROM player LEFT JOIN (SELECT ID, alliance.name, alliance.abbreviation, members.player FROM alliance INNER JOIN members ON alliance.ID = members.alliance_id WHERE members.player = ID) as alli ON alli.player = alli.ID WHERE ?? = ? ";


    sql = mysql.format(sql, inserts);

    DB.query(sql, null, function(result){

        if(result.length === 1)
        {
            response.json(result[0]); 
        }
        else 
           response.json({error: "Wrong username or password"});

    }); 
});

require('./routes')(app);




