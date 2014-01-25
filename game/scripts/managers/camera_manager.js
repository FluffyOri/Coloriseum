/***************************************************************************************************
***  DESCRIPTION => add a camera to the world
***  INPUT       => position of focus of the camera
***  OUTPUT      => none
***************************************************************************************************/
define(["app", "world"], function(app, world) {
    return function(focusPos)
    {
        //create wrapper dom element
        var wrapper            = document.createElement("div");
        wrapper.id             = "wrapper";
        wrapper.style.overflow = "hidden";
        wrapper.style.width    = app.SCENE_WIDTH + "px";
        wrapper.style.height   = app.SCENE_HEIGHT + "px";
        document.body.appendChild(wrapper);
        wrapper.appendChild(app.canvas);

        //create the camera gameobject
        world.gameObjects.camera = {
            focusPos : focusPos,
            offsetX : 0,
            offsetY : 0,
            update : function()
            {
                this.offsetX = this.focusPos.x - app.SCENE_WIDTH / 2;
                this.offsetY = this.focusPos.y - app.SCENE_HEIGHT / 2;
                wrapper.scrollLeft = this.offsetX;
                wrapper.scrollTop  = this.offsetY;
            }
        }
    }
});