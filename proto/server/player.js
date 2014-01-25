var topLeftAnchor     = { x : 0,    y : 0 };
var topRightAnchor    = { x : 1024, y : 0 };
var bottomLeftAnchor  = { x : 0,    y : 768 };
var bottomRightAnchor = { x : 1024, y : 768 };
var colors = {
    blue   : "rgb(66, 27, 121)",
    orange : "rgb(252, 176, 64)",
    pink   : "rgb(240, 103, 167)",
    green  : "rgb(60, 187, 149)"
}

var Player = function Player(params)
{
    this.id       = params.id;
    this.size     = params.size;
    this.speed    = 10;

    switch(this.id)
    {
        case 0:
            this.position = {
                x : topLeftAnchor.x + 10,
                y : topLeftAnchor.y + 10,
            }
            this.color = colors.blue;
        break;
        case 1:
            this.position = {
                x : topRightAnchor.x - this.size.x - 10,
                y : topRightAnchor.y + 10,
            }
            this.color = colors.orange;
        break;
        case 2:
            this.position = {
                x : bottomLeftAnchor.x + 10,
                y : bottomLeftAnchor.y - this.size.y - 10,
            }
            this.color = colors.pink;
        break;
        case 3:
            this.position = {
                x : bottomRightAnchor.x - this.size.x - 10,
                y : bottomRightAnchor.y - this.size.y - 10,
            }
            this.color = colors.green;
        break;
    }

    this.move = function(vector)
    {
        console.log("hue")
        this.position.x += this.speed * vector.x;
        this.position.y += this.speed * vector.y;
    }
}

module.exports = Player;