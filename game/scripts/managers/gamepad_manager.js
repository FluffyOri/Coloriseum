define([], function() {
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
                    this.gamepads = rawGamepads[i];
            }
        },

        run : function() {
            this.pollGamepads();

            
        }
    }  
});

