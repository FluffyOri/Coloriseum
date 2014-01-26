Bullet = function(targetX,targetY,playerColor,playerId,bulletSpeed,playerId)
{
	this.id = playerId;
	this.x = players[playerId].x + 10;
	this.y = players[playerId].y + 10;
	this.width = 6;
	this.height = 6;
	this.targetX = targetX || 300;
	this.targetY = targetY || 300;
	this.speed = bulletSpeed;
	this.color = playerColor;
	this.angle = Math.atan2(this.x - this.targetX, this.y - this.targetY) + Math.PI/2;
}

Bullet.prototype.draw = function()
{
	canvasManager.context.fillStyle = 'black';
	canvasManager.context.fillRect(this.x, this.y, this.width, this.height);
	canvasManager.context.fillStyle = this.color;
	canvasManager.context.fillRect(this.x+1, this.y+1, this.width-2, this.height-2);
}

Bullet.prototype.move = function()
{
	this.x += Math.cos(this.angle) * this.speed;
	this.y -= Math.sin(this.angle) * this.speed;
}

