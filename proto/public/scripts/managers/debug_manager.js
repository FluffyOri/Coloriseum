var world = require("../models/world");

function debugManager()
{
    if (world.debugMode)
    {
        window.world = world;
    }
}

module.exports = debugManager;