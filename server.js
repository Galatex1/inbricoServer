const express = require('express');
const app = express();
var DB = require('./database.js');


require('./routes')(app);
const cors = require('cors');
 

var path = __dirname + '/server.js';


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


app.listen(8000, () => {
  console.log('Server started!');
});

app.post('/',function(request,response, next){});

app.post('/login',function(request,response, next){
    
    var waitTill = new Date(new Date().getTime() + 0.5 * 1000);
    while(waitTill > new Date()){}

    let sql = "SELECT ID, username, password, center, (SELECT count(*) FROM map WHERE player_id = player.ID) as tilecount FROM player WHERE username ='"+request.body.username+"'";

    console.log(request.body.username)

    DB.query(sql, null, function(result){

        if(result.length === 1)
        {
            response.json(result[0]); 
        }
        else 
           response.json({error: "Wrong username or password"});

    });
    
    
    
    
});



