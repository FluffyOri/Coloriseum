require(   ["app", "world", 
			"debug_manager", "gamepad_manager", "garbage_collector",
			"stats", "jquery"], 
	function(app,   world,  
			 debugManager,    gamepadManager,    garbageCollector) {

		$(function() {
			function init ()
			{
				//set canvas properties and context
				app.canvas        = document.getElementById("canvas");
				app.ctx           = app.canvas.getContext("2d");
				app.canvas.width  = app.GAME_WIDTH;
				app.canvas.height = app.GAME_HEIGHT;

				//call managers
				gamepadManager.init();
				debugManager();

				//call gameloop
				gameloop();

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

			init();
		});
	}
);