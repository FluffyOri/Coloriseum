var Ennemy = function()
{
	var colorIndex = Math.floor((Math.random()*4));
	this.x =  Math.floor((Math.random()*560)+1);
	this.y =  Math.floor((Math.random()*560)+1);
	this.width = 30;
	this.height = 30;
	this.life = 3;
	this.color = colorsArray[colorIndex];
}

Ennemy.prototype.draw = function()
{
	canvasManager.context.fillStyle = this.color;
	canvasManager.context.fillRect(this.x, this.y, this.width, this.height);
	canvasManager.context.lineWidth = 5;
	canvasManager.context.strokeStyle = 'white';
    canvasManager.context.stroke();
}