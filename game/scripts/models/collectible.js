define(["app", "utils", "world", "bullet", "player", "main"], function(app, utils, world, Bullet, popCollectible) {

	var Collectible = function(params)
	{
		this.position = {
			x : Math.floor((Math.random()*1024)+1),
		    y : Math.floor((Math.random()*768)+1)
		};
		this.size = app.collectibleSize;
		this.img = new Image();
		this.img.src = app.collectibleImg;
		this.tag = app.collectibleTag;
		this.alive = true;

		this.update = function()
	    {
	    	if(this.alive)
	    	{
		    	this.collisions();
		    	this.render();
	    	}
	    }
	}

	Collectible.prototype.render = function()
	{
		app.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
	}

	Collectible.prototype.collisions = function()
	{
		var that = this;
		world.forAll(world.gameObjects, function(object) {
            if (that.position.x + that.size.x > object.position.x && that.position.x < object.position.x + object.size.x &&
                that.position.y + that.size.y > object.position.y && that.position.y < object.position.y + object.size.y && 
                object.tag === "player")
            {
                that.setEffects(object);
            }
        });
	}

	Collectible.prototype.setEffects = function(object)
	{
		var _randomEffect = Math.floor((Math.random()*3)+1);

		if(_randomEffect == 1)
		{
			object.speed = 6;
		}
		if(_randomEffect == 2)
		{
			app.bulletSpeed = 4;
		}
		if(_randomEffect == 3)
		{
			object.speed = -3;
		}
		if(_randomEffect == 4)
		{
			object.hightlander = false;
		}

		setTimeout(function(){Collectible.prototype.cancelEffects(object)},5000);
		this.alive = false;
	}

	Collectible.prototype.cancelEffects = function(object)
	{
		object.speed = 3;
		object.hightlander = true;
		app.bulletSpeed = 8;

		var collectibleTag = app.collectibleTag;
		var collectibleSize = app.collectibleSize;
		var collectibleImg = app.collectibleImg;
		world.gameObjects.push(new Collectible(
			collectibleTag,
			collectibleSize,
			collectibleImg
    	));
	}


	return Collectible;
});
