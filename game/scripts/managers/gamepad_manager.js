define(["world", "player"], function(world, Player) {
    return {
        gamepads: [],

        init: function() {
          var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
          console.log(gamepadSupportAvailable)
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
                        size : { x : 30, y : 30 }
                    }));
                    console.table(world.gameObjects);
                }
            }
        }
    }  
});

