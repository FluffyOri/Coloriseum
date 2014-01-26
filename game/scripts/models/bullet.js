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
        var cases = world.findGameObjectsWithTag("case");
        for (var i = 0; i < cases.length; i++)
        {
            if (cases[i].tileNum > 4 && cases[i].tileNum < 9)
            {
                if (this.position.x + this.size.x >= cases[i].position.x && this.position.x <= cases[i].position.x + cases[i].size.x &&
                    this.position.y + this.size.y >= cases[i].position.y && this.position.y <= cases[i].position.y + cases[i].size.y)
                {
                    this.die();               
                }                
            }
        }

        var that = this;
        world.forAll(world.gameObjects, function(object) {
            if (object)
            {
                if (that.position.x + that.size.x > object.position.x && that.position.x < object.position.x + object.size.x &&
                    that.position.y + that.size.y > object.position.y && that.position.y < object.position.y + object.size.y)
                {
                    if (object.tag === "player" && object.id != that.ownerID)
                    {
                        if (app.gameMode === "scoring")
                        {
                            if (object.wanted)
                            {
                                world.gameObjects[that.ownerID].addFrag(2);
                                object.wanted = false;
                            }
                            else
                                world.gameObjects[that.ownerID].addFrag(1);
                        }

                        if (app.gameMode === "limited_life")
                        {
                            if (object.wanted)
                            {
                                world.gameObjects[that.ownerID].addLife();
                                object.wanted = false;
                            }
                        }

                        world.gameObjects[that.ownerID].addFilterPattern(object.idColor);
                        object.die();
                        that.die();
                    }
                }
            }
        });
    }

    return Bullet;
});
