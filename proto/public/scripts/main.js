require("./libs/jquery.js");
require("./libs/jquery.hotkeys.js");
var io = require("socket.io-browserify");

window.socket    = io.connect("http://localhost:8075");
var app          = require("./app");
var utils        = require("./managers/utils");
var debugManager = require("./managers/debug_manager");
var inputManager = require("./managers/input_manager");
var world        = require("./models/world");
var Player       = require("./models/player");


$(function() {
	function init ()
	{
		//set canvas properties and context
		app.canvas        = document.getElementById("canvas");
		app.ctx           = app.canvas.getContext("2d");
		app.canvas.width  = app.GAME_WIDTH;
		app.canvas.height = app.GAME_HEIGHT;

		//call managers
		inputManager();
		debugManager();
	
		socket.on("init", function(data) {
		    for (var i = 0; i < data.players.length; i++)
		    {
		    	var isMine = false;
		    	if (data.activePlayerID === i)
		    		isMine = true;
		    	createPlayer(data.players[i], isMine);
			}

			socket.on("new player", function(data) {
				createPlayer(data, false);
			});

			socket.on("update positions", function(data) {
				for (var i = 0; i < data.length; i++)
				{
					console.log(data[i].position);
					world.findGameObjectsWithTag("player")[i].position = data[i].position;
				}
			});

			//call gameloop
			gameloop();
		});
	}

	function createPlayer(playerData, isMine)
	{
		var params = {
			id : playerData.id,
			tag : "player",
			size : playerData.size,
			position : playerData.position,
			color : playerData.color,
			isMine : isMine
		}
		world.gameObjects.push(new Player(params));
	}

	function gameloop()
	{	
	    cleanCanvas();
	    world.run();

	    socket.emit("ask positions");
	
		requestAnimationFrame(gameloop);
	}

	function cleanCanvas()
	{
		app.ctx.fillStyle = "black"; 
		app.ctx.fillRect(0,0,app.GAME_WIDTH,app.GAME_HEIGHT);	
	}

	init();
});
