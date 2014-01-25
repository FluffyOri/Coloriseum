define(["world", "app"], function(world, app) {
    var Bullet = function Bullet(params) 
    {
        this.position = params.position;
        this.size = { x : 5, y : 5 };

        this.speedVector = params.speedVector;
    }

    return Bullet;
});
