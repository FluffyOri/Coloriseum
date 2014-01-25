var express = require('express');
var app     = express();

var id = 0;

var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
io.set('log level', 1);

//app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
    res.render('home.jade');
});

var Player = require("./server/player");

var players = [];

io.sockets.on('connection', function(socket) {
    
    if (players.length >= 4)
        return;

    var myPlayer = new Player({
        id : players.length,
        size : { x : 20, y : 20 },
    })
    players.push(myPlayer);
    
    io.sockets.emit("new player", myPlayer);
    socket.emit("init", { players : players, activePlayerID : myPlayer.id } );

    socket.on("player move", function(data) {
        players[data.playerId].move(data.vector);
        io.sockets.emit("update positions", players);
    });

    socket.on('disconnect', function() {
        players.splice(id, 1);
    });
    
});   


server.listen(8075);        