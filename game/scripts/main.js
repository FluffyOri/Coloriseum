require(   ["app", "world", 
			"debug_manager", "gamepad_manager", "garbage_collector", "map_manager", "collectible",
			"stats", "jquery"], 
	function(app,   world,  
			 debugManager,    gamepadManager,    garbageCollector,    mapManager, Collectible) {

		$(function() {
			function init ()
			{
				//set canvas properties and context
				app.canvas        = document.getElementById("canvas");
				app.ctx           = app.canvas.getContext("2d");
				app.canvas.width  = app.GAME_WIDTH;
				app.canvas.height = app.GAME_HEIGHT;

				app.gameMode = window.localStorage["gameMode"];

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

				popCollectible();

				var kaoune = document.getElementById("start");
				kaoune.style.zIndex = 1;

				setTimeout(function(){kaoune.style.zIndex = -1;},3000);
				
				//call gameloop
				gameloop();

				setTimeout(popGeneralEvent, 5000);

				setTimeout(checkGameOver,5000);

			}

			function popCollectible()
			{
				var collectibleTag = app.collectibleTag;
				var collectibleSize = app.collectibleSize;
				var collectibleImg = app.collectibleImg;
				world.gameObjects.push(new Collectible(
					collectibleTag,
					collectibleSize,
					collectibleImg
	            //    tag : "collectible",
	             //   size : { x : 64, y : 51},
	               // img : "medias/collectible.png",
            	));
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
				app.ctx.fillStyle = "rgb(139,139,131)";
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

									var kaoune = document.getElementById("gameover");
									kaoune.style.zIndex = 1;

									console.log("Player " + playerNumber + " Wins !!!");
									app.ctx.font = '60pt Calibri';
									app.ctx.fillStyle = "rgb(223,223,223)";
      								app.ctx.fillText("Player " + playerNumber + " Wins !!!" , 300, 150);
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
							var kaoune = document.getElementById("gameover");
							kaoune.style.zIndex = 1;

							console.log("Player " + playerNumber + " Wins !!!");
							app.ctx.font = '60pt Calibri';
							app.ctx.fillStyle = "rgb(223,223,223)";					
      						app.ctx.fillText("Player " + playerNumber + " Wins !!!", 300, 150);
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

					if (world.findGameObjectsWithTag("player")[whichPlayerIsWanted])
						world.findGameObjectsWithTag("player")[whichPlayerIsWanted].wanted = true;

					//wanted during 10 sec
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

				setTimeout(popGeneralEvent, 30000);
			}

			init();
		});
	}
);