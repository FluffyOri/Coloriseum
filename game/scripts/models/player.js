define(["app", "utils", "world", "bullet"], function(app, utils, world, Bullet) {
    var Player = function Player(params) 
    {
        this.id       = params.id;              //id dans les gameObjects
        this.tag      = params.tag;             //id du player lui mm
        this.playerID = params.playerID;
        this.size     = params.size;
        this.speed    = app.playerSpeed;
        this.gamepad  = params.gamepad;
        this.shotTime = new Date().getTime();
        this.delay    = 250;
        this.alive    = true;
        this.life     = params.life || 1;
        this.frag     = 0;
        this.img      = new Image();


        switch(this.playerID)
        {
            case 0:
                this.position = {
                    x : app.topLeftAnchor.x + 10,
                    y : app.topLeftAnchor.y + 10,
                }
                this.color = "red";
                this.idColor = 0;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
            case 1:
                this.position = {
                    x : app.topRightAnchor.x - this.size.x - 10,
                    y : app.topRightAnchor.y + 10,
                }
                this.color = "red";
                this.idColor = 1;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
            case 2:
                this.position = {
                    x : app.bottomLeftAnchor.x + 10,
                    y : app.bottomLeftAnchor.y - this.size.y - 10,
                }
                this.color = "red";
                this.idColor = 2;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
            case 3:
                this.position = {
                    x : app.bottomRightAnchor.x - this.size.x - 10,
                    y : app.bottomRightAnchor.y - this.size.y - 10,
                }
                this.color = "red";
                this.idColor = 3;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
        }


        this.update = function()
        {
            if (this.alive)
            {
                this.move();
                this.collisions();
                this.render();
                
                if (this.shotTime + this.delay < new Date().getTime())
                {                
                   this.shoot();
                }
            }
        }
    }

    Player.prototype.render = function()
    {
        var vec2 = { x : this.gamepad.axes[2], y : this.gamepad.axes[3] };
        
        this.angle = Math.atan2(vec2.x, vec2.y);

        
        /*app.ctx.beginPath();
        app.ctx.save();
        app.ctx.translate(this.position.x + this.size.x/2, this.position.y + this.size.y/2);
        app.ctx.rotate(this.angle);
        // app.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        app.ctx.restore();*/

        app.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
    }

    Player.prototype.move = function()
    {
        this.lastPos = { x : this.position.x, y : this.position.y };

        if (this.gamepad.axes[0] > 0.2 || this.gamepad.axes[0] < -0.2)
            this.position.x += this.gamepad.axes[0] * this.speed;
        if (this.gamepad.axes[1] > 0.2 || this.gamepad.axes[1] < -0.2) 
            this.position.y += this.gamepad.axes[1] * this.speed;
    }

    Player.prototype.shoot = function()
    {
        var speedVector = null;
        if (this.gamepad.axes[2] > 0.2 || this.gamepad.axes[2] < -0.5)
        {
            speedVector = { x : this.gamepad.axes[2], y : this.gamepad.axes[3] };
        }
        if (this.gamepad.axes[3] > 0.2 || this.gamepad.axes[3] < -0.5)
        {
            speedVector = { x : this.gamepad.axes[2], y : this.gamepad.axes[3] };  
        }

        if (speedVector != null)
        {
            world.gameObjects.push(new Bullet({
                tag : "bullet",
                position : { x : this.position.x + this.size.x/2, y : this.position.y + this.size.y/2 },
                speedVector : speedVector,
                color : this.color,
                ownerID : this.id
            }));
            this.shotTime = new Date().getTime();
        }
    }

    Player.prototype.die = function()
    {
        this.position = {
            x : Math.floor(Math.random() * (app.GAME_WIDTH - this.size.x)),
            y : Math.floor(Math.random() * (app.GAME_HEIGHT - this.size.y))
        }
        
        this.previousColor = this.img.src;

        while(this.img.src == this.previousColor)
        {
            var newColorIndex = Math.floor((Math.random()*4));
            this.img.src = app.images["player" + (this.playerID+1)][newColorIndex];
        }

        if (app.gameMode === "limited_life")
        {
            if (this.life > 1)
            {
                this.life--;

            }
            else
            {
                this.alive = false;
            }
        }
    }

    Player.prototype.collisions = function()
    {
        //limits
        if (this.position.x + this.size.x > app.GAME_WIDTH || this.position.y + this.size.y > app.GAME_HEIGHT ||
            this.position.x < 0   || this.position.y < 0) 
        {
            this.position.x = this.lastPos.x;
            this.position.y = this.lastPos.y;
        }
    }

    Player.prototype.addFrag = function()
    {
        this.frag++;
    }

    return Player;
});
