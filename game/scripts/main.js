require(   ["app", "world", 
			"debug_manager", "gamepad_manager",
			"stats", "jquery"], 
	function(app,   world,  
			 debugManager,    gamepadManager) {

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

			    cleanCanvas();
			    gamepadManager.run();
			    world.run();

				stats.end();

				requestAnimationFrame(gameloop);
			}

			function cleanCanvas()
			{
				app.ctx.fillStyle = "black"; 
				app.ctx.fillRect(0,0,app.GAME_WIDTH,app.GAME_HEIGHT);	
			}

			init();
		});
	}
);