define({
	debugMode   : true,
	gameObjects : [],

	run : function()
	{
		this.forAll(this.gameObjects, function(object) {
			if (object.update)
				object.update();
		});
	},

	forAll : function(objects, func)
	{
		for (var i = 0, count = objects.length; i < count; i++)
		{
			func(objects[i]);

			if (objects[i].children != null)
				this.forAll(objects[i].children, func);
		}
	},

	findGameObjectWithTag : function(tag)
	{
		var object;

		this.forAll(this.gameObjects, function(obj) {
			if (obj.tag === tag)
			{
				object = obj;
				return;	
			}
		});
		
		return object;
	},

	findGameObjectsWithTag : function(tag)
	{
		var objects = [];

		this.forAll(this.gameObjects, function(obj) {
			if (obj.tag === tag)
			{
				objects.push(obj);
			}
		});
		
		return objects;
	}
});