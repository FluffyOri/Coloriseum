var Ennemy = function()
{
	this.x =  Math.floor((Math.random()*580)+1);
	this.y =  Math.floor((Math.random()*580)+1);
	this.width = 30;
	this.height = 30;
	this.life = 3;
	this.color = "red";
}

Ennemy.prototype.draw = function()
{
	canvasManager.context.fillStyle = this.color;
	canvasManager.context.fillRect(this.x, this.y, this.width, this.height);
	canvasManager.context.lineWidth = 5;
	canvasManager.context.strokeStyle = 'white';
    canvasManager.context.stroke();
}