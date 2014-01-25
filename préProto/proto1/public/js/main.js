var dashing = false;

function run()
{
    canvasManager.clean();

    //parcour du tableau des bullets du joueur pour check les collisions des bullets
    for(var i = 0; i<playersBullets.length; i++)
    {
        //parcour du tableau des ennemies
    	for(var j = 0; j<ennemies.length; j++)
    	{
            if(playersBullets[i].x > ennemies[j].x && playersBullets[i].x < ennemies[j].x+ennemies[j].width &&
                playersBullets[i].y > ennemies[j].y && playersBullets[i].y < ennemies[j].y+ennemies[j].height ||
                playersBullets[i].x + playersBullets[i].width > ennemies[j].x && playersBullets[i].x+playersBullets[i].width < ennemies[j].x+players[j].width &&
                playersBullets[i].y+playersBullets[i].height > ennemies[j].y && playersBullets[i].y+playersBullets[i].height < ennemies[j].y+players[j].height)
            {
                console.log("bang enemy");

                if(ennemies[j].life > 0)
                {
                    ennemies[j].life -= 1;
                }
                
                if(ennemies[j].life == 0)
                {
                    players[playersBullets[i].id].score += 10;
                    players[playersBullets[i].id].lastColor = ennemies[j].color;
                    players[playersBullets[i].id].allColors.push(ennemies[j].color);
                    ennemies.splice(j, 1);
                    ennemies.push(new Ennemy());
                }
                playersBullets.splice(i,1);
            }
        }
    }

    for(var i = 0; i<players.length; i++)
    {
        //parcour du tableau des ennemies
        for(var j = 0; j<Collectible_Effects.length; j++)
        {
            if(players[i].alive && players[i].canMove)
            {
                if(players[i].x > Collectible_Effects[j].x && players[i].x < Collectible_Effects[j].x+Collectible_Effects[j].width &&
                    players[i].y > Collectible_Effects[j].y && players[i].y < Collectible_Effects[j].y+Collectible_Effects[j].height)
                {
                    console.log("take Collectibles");
                    Collectible_Effect.applicateEffect(players[i]);
                    setTimeout(function(){Collectible_Effect.cancelEffect(players[i])},2000);
                    Collectible_Effects.splice(j,1);
                }
            }
        }
    }

    for(var i = 0; i<players.length; i++)
    {
        //parcour du tableau des ennemies
        for(var j = 0; j<ennemies.length; j++)
        {
            if(players[i].x > ennemies[j].x && players[i].x < ennemies[j].x+ennemies[j].width &&
                players[i].y > ennemies[j].y && players[i].y < ennemies[j].y+ennemies[j].height)
            {
                console.log("enemy contact");
                
                if(players[i].life > 0)
                {  
                    players[i].hitDash();
                    players[i].life -= 1;
                }
                if(players[i].life <= 0)
                {  
                    console.log("dead motherfucker !!!");
                    players[i].alive = false;
                    players[i].canMove = false;
                    players[i].isDead();
                }
            }                
        }
    }




/*            //check bullets avec id non joueur et du joueur
    		if(bullets[i].x > players[j].x && bullets[i].x < players[j].x+players[j].width &&
    			bullets[i].y > players[j].y && bullets[i].y < players[j].y+players[j].height &&
    			bullets[i].id != players[j].id ||
    			bullets[i].x+bullets[i].width > players[j].x && bullets[i].x+bullets[i].width < players[j].x+players[j].width &&
    			bullets[i].y+bullets[i].height > players[j].y && bullets[i].y+bullets[i].height < players[j].y+players[j].height &&
    			bullets[i].id != players[j].id)
    		{
    			players[j].alive = false;
    			players[bullets[i].id].score += 10;
    			//players.splice(players[j].id,1);
    		}

            player et ennemyBullets

            playersBullets et ennemies

            playerBullets = [];
            ennemyBullets = [];

*/
/*
            //Check collision bullets avec id joueur et ennemies
            if(ennemies != [])
            {
                if (bullets[i].x > ennemies[j].x && bullets[i].x < ennemies[j].x+ennemies[j].width  &&
                    bullets[i].y > ennemies[j].y && bullets[i].y < ennemies[j].y+ennemies[j].height &&
                    bullets[i].id != players[j].id ||
                    bullets[i].x + bullets[i].width > ennemies[j].x && bullets[i].x+bullets[i].width < ennemies[j].x+players[j].width &&
                    bullets[i].y+bullets[i].height > ennemies[j].y && bullets[i].y+bullets[i].height < ennemies[j].y+players[j].height &&
                    bullets[i].id != ennemies[j].id)
                {
                
                }
            }

            //Check Collision Collectibles Bonus/Malus
            if(Collectible_Effects != [])
            {
                if (players[i].x > Collectible_Effects[j].x && players[i].x < Collectible_Effects[j].x+Collectible_Effects[j].width  &&
                    players[i].y > Collectible_Effects[j].y && players[i].y < Collectible_Effects[j].y+Collectible_Effects[j].height)
                {
                    
                }
            }
            */

	for(var i=0; i < playersBullets.length; i++)
	{

		if(playersBullets[i].x > 0 || playersBullets[i].x < canvasManager.width+6 ||
			playersBullets[i].y > 0 || playersBullets[i].y < canvasManager.height+6)
		{
			playersBullets[i].draw();
			playersBullets[i].move();
		}
/*
		if(bullets[i].x < -6 || bullets[i].x > canvasManager.width+6 ||
			bullets[i].y < -6 || bullets[i].y > canvasManager.height+6)
		{
			bullets[i].splice(i,1);
		}
*/
	}

 	for(var i = 0; i < players.length; i++)
    {
    	if(players[i].alive)
    	{	
		  	players[i].draw();
		    players[i].move();
    	}
	}

    for(var i = 0; i < ennemies.length; i++)
    {
        ennemies[i].draw();
    }

    for(var i = 0; i < Collectible_Effects.length; i++)
    {
        Collectible_Effects[i].draw();
    }


	requestAnimFrame(run);
}