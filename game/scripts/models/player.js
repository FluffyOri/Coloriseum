define(["app", "world"], function(app, world) {
    var Player = function Player(params) 
    {
        this.id       = params.id;
        this.tag      = params.tag;
        this.playerID = params.playerID;
        this.size     = params.size;
        this.speed    = 10;

        switch(this.id)
        {
            case 0:
                this.position = {
                    x : app.topLeftAnchor.x + 10,
                    y : app.topLeftAnchor.y + 10,
                }
                this.color = app.colors.blue;
            break;
            case 1:
                this.position = {
                    x : app.topRightAnchor.x - this.size.x - 10,
                    y : app.topRightAnchor.y + 10,
                }
                this.color = app.colors.orange;
            break;
            case 2:
                this.position = {
                    x : app.bottomLeftAnchor.x + 10,
                    y : app.bottomLeftAnchor.y - this.size.y - 10,
                }
                this.color = app.colors.pink;
            break;
            case 3:
                this.position = {
                    x : app.bottomRightAnchor.x - this.size.x - 10,
                    y : app.bottomRightAnchor.y - this.size.y - 10,
                }
                this.color = app.colors.green;
            break;
        }

        this.render = function()
        {
            app.ctx.fillStyle = "white";
            app.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        }

        this.move = function()
        {
            this.position.x ++;
        }

        this.update = function()
        {
            this.render();
        }
    }

    return Player;
});