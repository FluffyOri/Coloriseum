define(["app", "world"], function(app, world) {
    var Player = function Player() 
    {
        this.id       = params.id;
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
                    x : app.app.topRightAnchor.x - this.size.x - 10,
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

        
    }
});