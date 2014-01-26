define(["app", "utils", "world", "bullet"], function(app, utils, world, Bullet) {
    var Player = function Player(params) 
    {
        this.id          = params.id;
        this.tag         = params.tag;
        this.playerID    = params.playerID;
        this.size        = params.size;
        this.speed       = app.playerSpeed;
        this.gamepad     = params.gamepad;
        this.shotTime    = new Date().getTime();
        this.delay       = 250;
        this.sightRadius = 75;
        this.img         = new Image();
        this.viewActive  = true;


        switch(this.playerID)
        {
            case 0:
                this.position = {
                    x : app.topLeftAnchor.x + 10,
                    y : app.topLeftAnchor.y + 10,
                }
                this.color = app.colors[0];
                this.idColor = 0;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
            case 1:
                this.position = {
                    x : app.topRightAnchor.x - this.size.x - 10,
                    y : app.topRightAnchor.y + 10,
                }
                this.color = app.colors[1];
                this.idColor = 1;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
            case 2:
                this.position = {
                    x : app.bottomLeftAnchor.x + 10,
                    y : app.bottomLeftAnchor.y - this.size.y - 10,
                }
                this.color = app.colors[2];
                this.idColor = 2;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
            case 3:
                this.position = {
                    x : app.bottomRightAnchor.x - this.size.x - 10,
                    y : app.bottomRightAnchor.y - this.size.y - 10,
                }
                this.color = app.colors[3];
                this.idColor = 3;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
        }

        this.setPattern(app.buffers[this.idColor].canvas);

        this.update = function()
        {
            this.controls();
            this.move();
            this.collisions();
            this.render();
            if (this.shotTime + this.delay < new Date().getTime())
            {                
                this.shoot();
            }
        }
    }

    Player.prototype.controls = function()
    {
        if (this.gamepad.buttons[10] > 0)
        {
            
        }
    }

    Player.prototype.setPattern = function(pattern)
    {
        this.pat = app.ctx.createPattern(app.buffers[this.idColor].canvas,"no-repeat");
    }

    Player.prototype.render = function()
    {
        app.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
        if (this.viewActive)
        {
            app.ctx.fillStyle = this.pat;
            app.ctx.beginPath();
            app.ctx.arc(this.position.x+this.size.x/2, this.position.y+this.size.y/2, this.sightRadius, 0, Math.PI*2);
            app.ctx.fill();            
        }
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

    return Player;
});
