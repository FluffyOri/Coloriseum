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
			}

			function gameloop()
			{
				stats.begin();

			    cleanCanvas();
			    gamepadManager.run();
			    world.run();

			    garbageCollector();

				stats.end();

				requestAnimationFrame(gameloop);
			}

			function cleanCanvas()
			{
				app.ctx.fillStyle = "black"; 
				app.ctx.fillRect(0,0,app.GAME_WIDTH,app.GAME_HEIGHT);
				app.ctx.drawImage(app.buffers[4].canvas, 0, 0);
				//app.ctx.drawImage(app.buffers[0].canvas, 0, 0);
			}

			init();
		});
	}
);