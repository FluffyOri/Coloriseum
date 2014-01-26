define(["world", "app"], function(world, app) {
    var Bullet = function Bullet(params) 
    {
        this.position = params.position;
        this.size = { x : 8, y : 8 };
        this.speed = app.bulletSpeed;
        this.color = params.color;
        this.ownerID = params.ownerID;

        this.speedVector = params.speedVector;

        this.update = function()
        {
            this.move();
            this.collision();
            this.render();
        }
    }

    Bullet.prototype.render = function()
    {
        app.ctx.fillStyle = this.color;
        app.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    Bullet.prototype.move = function()
    {
        this.position.x += this.speedVector.x * app.bulletSpeed;
        this.position.y += this.speedVector.y * app.bulletSpeed;
    }

    Bullet.prototype.die = function()
    {
        this.dead = true;
    }

    Bullet.prototype.collision = function()
    {
        var that = this;
        world.forAll(world.gameObjects, function(object) {
            if (that.position.x + that.size.x > object.position.x && that.position.x < object.position.x + object.size.x &&
                that.position.y + that.size.y > object.position.y && that.position.y < object.position.y + object.size.y)
            {
                if (object.tag === "player" && object.playerID != that.ownerID)
                {
                    object.die();
                }
            }
        });
    }

    return Bullet;
});
