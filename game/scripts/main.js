require(   ["app", "world", 
			"debug_manager", "gamepad_manager", "garbage_collector", "map_manager",
			"stats", "jquery"], 
	function(app,   world,  
			 debugManager,    gamepadManager,    garbageCollector,    mapManager) {

		$(function() {
			function init ()
			{
				//set canvas properties and context
				app.canvas        = document.getElementById("canvas");
				app.ctx           = app.canvas.getContext("2d");
				app.canvas.width  = app.GAME_WIDTH;
				app.canvas.height = app.GAME_HEIGHT;

				for (var i = 0; i < app.buffers.length; i++)
				{
					app.buffers[i].canvas = document.createElement("canvas");
					app.buffers[i].ctx    = app.buffers[i].canvas.getContext("2d");
					app.buffers[i].canvas.width  = app.GAME_WIDTH;
					app.buffers[i].canvas.height = app.GAME_HEIGHT;
				}

				//call managers
				gamepadManager.init();
				debugManager();
				mapManager();


				//call gameloop
				gameloop();

				setTimeout(popGeneralEvent, 5000);

				setTimeout(checkGameOver,5000);
			}

			function gameloop()
			{
				stats.begin();

				if (!app.paused)
				{
			    	cleanCanvas();
			    	gamepadManager.run();
			    	world.run();
			    	garbageCollector();
			    	checkGameOver();

					stats.end();

					requestAnimationFrame(gameloop);
				}
			}

			function cleanCanvas()
			{
				app.ctx.fillStyle = "black"; 
				app.ctx.fillRect(0,0,app.GAME_WIDTH,app.GAME_HEIGHT);
				app.ctx.drawImage(app.buffers[4].canvas, 0, 0);
			}

			function checkGameOver() 
			{
				if (app.gameMode === "limited_life")
				{
					if (app.stillAlive === 1)
					{
						for (var i = 0; i < world.findGameObjectsWithTag("player").length; i++)
						{
							if (world.findGameObjectsWithTag("player")[i])
							{
								if (world.findGameObjectsWithTag("player")[i].alive)
								{
									var playerNumber = i + 1;
									app.paused = true;
									console.log("Player " + playerNumber + " Wins !!!");
								}
							}
						}
					}
				}

				else if (app.gameMode === "scoring")
				{
					for (var i = 0; i < world.findGameObjectsWithTag("player").length; i++)
					{
						if (world.findGameObjectsWithTag("player")[i].frag === app.neededScore)
						{
							var playerNumber = i + 1;
							app.paused = true;
							console.log("Player " + playerNumber + " Wins !!!");
						}
					}
				}
			}

			function popGeneralEvent()
			{
				// var whichRandomEvent = Math.floor(Math.random()*3 + 1);
				var whichRandomEvent = 1;

				if (whichRandomEvent === 1)
				{
					var whichPlayerIsWanted = Math.floor(Math.random()*4);

					if (whichPlayerIsWanted >= world.findGameObjectsWithTag("player").length)
					{
						whichPlayerIsWanted = Math.floor(Math.random());
					}

					world.findGameObjectsWithTag("player")[whichPlayerIsWanted].wanted = true;

					setTimeout(cancelWanted, 10000);
				}

				if (whichRandomEvent === 2)
				{

				}

				if (whichRandomEvent === 3)
				{

				}

				if (whichRandomEvent === 4)
				{

				}
			}

			function cancelWanted()
			{
				for (var i = 0; i < world.findGameObjectsWithTag("player").length; i++)
				{
					world.findGameObjectsWithTag("player")[i].wanted = false;
				}
			}

			init();
		});
	}
);