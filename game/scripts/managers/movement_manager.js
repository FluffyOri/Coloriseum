define(["world"], function(world) {
	return function(target)
	{
		var on = function(dirKeys, doThis)
		{
			for (var i = 0; i < dirKeys.length; i++) {
				if (dirKeys[i]) {
					doThis();
					break;
				}			
			}
		}

		target.prototype.moveForward = function()
		{
			this.position.x += this.speed * Math.cos(Math.PI*-this.angle/180);
			this.position.y += this.speed * Math.sin(Math.PI*-this.angle/180);
		}

		target.prototype.crossDirectional = function(params)
		{
			var self = this;
			var keys = params || {};

			var upKeys    = keys.upKeys    || [keydown.z, keydown.up];
			var leftKeys  = keys.leftKeys  || [keydown.q, keydown.left];
			var downKeys  = keys.downKeys  || [keydown.s, keydown.down];
			var rightKeys = keys.rightKeys || [keydown.d, keydown.right];

			on(upKeys, function() {
				self.position.y-=self.speed;
			});
			on(leftKeys, function() {
				self.position.x-=self.speed;
			});
			on(downKeys, function() {
				self.position.y+=self.speed;
			});
			on(rightKeys, function() {
				self.position.x+=self.speed;
			});
		}

		target.prototype.jump = function(params)
		{
			var self = this;
			var keys = params || [keydown.space]

			on(keys, function() {
				self.position.y-=15;
			});
		}

		target.prototype.gravity = function()
		{
				this.position.y += world.gravity;
		}
	}
});