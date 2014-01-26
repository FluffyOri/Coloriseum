define(["world", "player", "app"], function(world, Player, app) {
    return {
        gamepads: [],

        init: function() {
          var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
        },

        pollGamepads : function() {
            var rawGamepads = navigator.webkitGetGamepads && navigator.webkitGetGamepads();
            for (var i = 0; i < rawGamepads.length; i++)
            {
                if (rawGamepads[i] != null)
                    this.gamepads.push(rawGamepads[i]);
            }
        },

        run : function() {
            this.pollGamepads();
            this.checkGamepadConnect();
            
        },

        checkGamepadConnect : function()
        {

            for (var i = 0; i < this.gamepads.length; i++)
            {
                var playerExist = false;
                var players = world.findGameObjectsWithTag("player");
                for (var j = 0; j < players.length; j++)
                {
                    if (this.gamepads[i].index === players[j].playerID)
                    {
                        playerExist = true;
                    }                    
                }

                if (!playerExist)
                {
                    world.gameObjects.push(new Player({
                        tag : "player",
                        id : world.gameObjects.length,
                        playerID : i,
                        size : { x : 32, y : 32 },
                        gamepad : this.gamepads[i]
                    }));

                    app.stillAlive++;
                }
            }
        }
    }  
});