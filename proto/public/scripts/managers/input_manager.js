/*require("./libs/jquery.js");
require("./libs/jquery.hotkeys.js");*/

function inputManager() {
    window.keydown = {};

    function keyName(event) {
        return jQuery.hotkeys.specialKeys[event.which] ||
            String.fromCharCode(event.which).toLowerCase();
    }

    $(document).bind("keydown", function(event) {
        keydown[keyName(event)] = true;
    });

    $(document).bind("keyup", function(event) {
        keydown[keyName(event)] = false;
    });
}

module.exports = inputManager;