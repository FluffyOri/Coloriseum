var Collectible_Effect = function(randomEffectIndex)
{
	this.x =  Math.floor((Math.random()*580)+1);
	this.y =  Math.floor((Math.random()*580)+1);
	this.width = 30;
	this.height = 30;
	this.color = "gold";
	this.randomEffect = randomEffectIndex;
}

Collectible_Effect.prototype.draw = function()
{
	canvasManager.context.fillStyle = this.color;
	canvasManager.context.fillRect(this.x, this.y, this.width, this.height);
	canvasManager.context.lineWidth = 5;
	canvasManager.context.strokeStyle = 'white';
    canvasManager.context.stroke();
}

Collectible_Effect.applicateEffect = function(player)
{
	var _randomEffect = Math.floor((Math.random()*6)+1);

	if(_randomEffect == 1)
	{
		player.fireSpeed = 100;
		console.log("firespeed");
	}		
		
	else if(_randomEffect == 2)
	{	
    	player.bulletSpeed = 20;
    	console.log("bulletspeed");
	}

    else if(_randomEffect == 3)
    {
    	player.speed = 10;
    	console.log("playerspeed");
    }

    else if(_randomEffect == 4)
	{
		player.fireSpeed = 300;
		console.log("slow firespeed");
	}		
		
	else if(_randomEffect == 5)
	{	
    	player.bulletSpeed = 5;
    	console.log("slow bulletspeed");
	}

    else if(_randomEffect == 6)
    {
    	player.speed = 1;
    	console.log("slow playerspeed");
    }
    	

    setTimeout(function(){Collectible_Effects.push(new Collectible_Effect());},5000);
}

Collectible_Effect.cancelEffect = function(player)
{
	
	player.fireSpeed = 200;

	player.bulletSpeed = 10;

	player.speed =2;
}

function popCollectible()
{
	var randomEffectIndex = Math.floor((Math.random()*3)+1);
	Collectible_Effects.push(new Collectible_Effect(randomEffectIndex));
}