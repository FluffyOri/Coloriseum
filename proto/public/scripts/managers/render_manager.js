define(["app", "world"], function(app, world) {
	return function(object)
	{
		object.prototype.drawDebug = function()
		{
			var ctx = app.ctx;

			ctx.fillStyle = this.color;	

			switch(this.shape)
			{
				case "rect":	 
					ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
				break;

				case "circle":
					ctx.beginPath()
					ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
					ctx.fill();
				break;
			}
		}

		object.prototype.render = function()
		{


			if (world.debugMode) {
				this.drawDebug();
			}
		}
	}
});