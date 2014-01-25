function Player(params)
{
	this.id = players.length;
    this.x = params.x;
    this.y = params.y;
    this.width  = params.width  || 10;
    this.height = params.height || 10;
    this.speed = params.speed || 2;
    this.sens = params.sens || 2;
    this.canShoot = params.canShoot || false;
    this.shoot = params.shoot || false;
    this.color = params.color;
    this.canDash = params.canDash || true;
    this.fireSpeed = params.fireSpeed || 200;
    this.alive = params.alive || true;
    this.score = params.score ||0;
    this.dashValue = params.dashValue || 40;
    this.bulletSpeed = 10;
    this.wanted = false;
   // this.angle = Math.atan2(this.x - targetX, this.y - targetY) + Math.PI/2;
}

Player.prototype.move = function()
{
	if(this.alive)
	{
		if(this.gauche)
		{
			if(this.x>0)
			{
				this.sens = 1;
				this.x -= this.speed;
			}
		}
		if(this.droite)
		{
			if(this.x<canvasManager.width-this.width)
			{
				this.sens = 3;
				this.x += this.speed;
			}
		}	
		if(this.haut)
		{
			if(this.y>0)
			{
				this.sens = 2;
				this.y -= this.speed;
			}
		}	
		if(this.bas)
		{
			if(this.y<canvasManager.height-this.height)
			{
				this.sens = 4;
				this.y += this.speed;
			}
		}
		if(this.dash)
		{
			if(this.canDash)
			{
				this.launchDash();
				if(this.sens === 1)
				{
					if(this.x - this.dashValue>0)
					{
						this.x -= this.dashValue;
					}
				}
				if(this.sens === 3)
				{
					if(this.x + this.dashValue < canvasManager.width)
					{
						this.x += this.dashValue;
					}
				}
				if(this.sens === 2)
				{
					if(this.y - this.dashValue>0)
					{
						this.y -= this.dashValue;
					}
				}
				if(this.sens === 4)
				{
					if(this.y + this.dashValue < canvasManager.height)
					{
						this.y += this.dashValue;
					}
				}
			}
		}
		if(this.canShoot)
		{
			if(!this.shoot)
		    {
		    	//wtf js
		        Player.prototype.shoot(this.fireSpeed,this.bulletSpeed,this.id,this.color,mouseTarget);
		    }
		}
	}
		
}

Player.prototype.draw = function()
{
	canvasManager.context.fillStyle = 'black';
	canvasManager.context.fillRect(this.x, this.y, this.width, this.height);
	canvasManager.context.fillStyle = this.color;
	canvasManager.context.fillRect(this.x+1, this.y+1, this.width-2, this.height-2);
}

Player.prototype.launchDash = function()
{
	this.canDash = false;
	dashing = true;
	setTimeout(function(){ players[0].canDash = true },1000);
	setTimeout(function(){ dashing = false },200);
}

Player.prototype.shoot = function(fireSpeed,bulletSpeed,id,color)
{
	this.fireSpeed = fireSpeed;
	this.bulletSpeed = bulletSpeed;
	this.id = id;
	this.color = color;
	//bullets.push(new Bullet(targetX,targetY,this.color,this.id));
	playersBullets.push(new Bullet(targetX,targetY,this.color, this.id,bulletSpeed,this.id))
	players[id].shoot = true;
	setTimeout(function(){ players[id].shoot = false }, this.fireSpeed);
	return this.id;
}