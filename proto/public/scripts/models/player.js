var app = require("../app");

var Player = function Player(params)
{
    this.id       = params.id;
    this.tag      = params.tag;
    this.position = params.position;
    this.size     = params.size;
    this.isMine   = params.isMine;
    this.color    = params.color;
    


    this.update = function()
    {
        this.render();
        if (this.isMine)
            this.move();
    }

    this.move = function()
    {
        if (keydown.s || keydown.down)
        {
            socket.emit("player move", {
                playerId : this.id,
                vector : { x : 0, y : +1 } 
            });
        }
    }

    this.render = function()
    {
        app.ctx.fillStyle = this.color;
        app.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    
}

module.exports = Player;