define(["world", "app", "map"], function(world, app, map) {
    var Case = function Case(params)
    {
        this.tag      = params.tag;
        this.position = params.position;
        this.size     = params.size;
        this.tileNum  = params.tileNum;

        if (this.tileNum != 9)
        {
            this.img      = new Image();
            this.img.src  = app.images.tiles[this.tileNum];            
        }


        this.update = function()
        {

        }

        this.render = function(numBuffer)
        {
            var context = app.buffers[numBuffer].ctx;

            if (this.img)
            {
                //context.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
                context.fillStyle = app.colors[numBuffer];
                context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
            }
            else
            {
                context.fillStyle = "white";
                context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
            }

            if (this.tileNum >= 5 && this.tileNum <= 8)
            {
                context.strokeStyle = "black";
                context.lineWidth = 2;
                context.strokeRect(this.position.x+1, this.position.y+1, this.size.x-2, this.size.y-2);
            }
        }
    }

    return Case;
});