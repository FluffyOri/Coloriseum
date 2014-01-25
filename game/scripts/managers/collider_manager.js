define(["world"], function(world) {
	return function(object)
	{
		object.prototype.savePosition = function()
		{
			this.lastPos = {
				x : this.position.x,
				y : this.position.y
			};
		}

		object.prototype.getColliders = function()
		{
			var objects    = world.getAllGameObjects();
			var colliders  = [];

			for (var i = objects.length - 1; i >= 0; i--) {
				var other = objects[i];

				if (this.position.x + this.size.width  > other.position.x &&
				    this.position.x < other.position.x + other.size.width &&
					this.position.y + this.size.height > other.position.y && 
					this.position.y < other.position.y + other.size.height) 
				{
					colliders.push(objects[i]);
				}
			}

			return colliders;
		}

		object.prototype.filterColliders = function(colliders, layers)
		{
			var filtered = [];

			for (var i = colliders.length - 1; i >= 0; i--) {
				for (var j = layers.length - 1; j >= 0; j--) {
					if (colliders[i].layer === layers[j]) {
						filtered.push(colliders[i]);
						break;
					}
				}
			}

			return filtered;
		}

		object.prototype.applyCollisions = function()
		{
			var layers     = Array.prototype.slice.call(arguments);
			var colliders  = this.filterColliders(this.getColliders(), layers);

			if (colliders.length > 0) {
				console.log("collisione!")
			}
		}
	}
});