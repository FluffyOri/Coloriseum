var players = [];
var colorsArray = ["bleu","orange","rose","vert"];
var usedColors = [];
//var bullets = [];
var ennemies = [];
var ennemiesBullets = [];
var playersBullets = [];
var Collectible_Effects = [];


// bleu 	66,27,121
// Orange	252,176,64
// rose		240,103,167
// vert		60,187,149 
//Math.floor((Math.random()*3)+1)

function initPlayers() {
    var joueur  = new Player({
	    x:      Math.floor((Math.random()*580)+1),
	    y:      Math.floor((Math.random()*580)+1),
	    width:   20,
	    height:  20,
	    speed:    2,
	    sens: 	  1,
	    canShoot: false,
	    canDash:  true,
	    shoot: 	  false,
	    fireSpeed : 500,
	    alive : true,
	    score : 0,
	    dashValue : 40,
	    color: "rgb("+ Math.floor((Math.random()*255)+1) +","
	    			+ Math.floor((Math.random()*255)+1) + ","
	    			+ Math.floor((Math.random()*255)+1) +")"
				});
	players.push(joueur);
	ennemies.push(new Ennemy());


	popCollectible();
}

window.onload = function(e) {
    canvasManager.init(600, 600);
	initPlayers();
	targetX = event.x;
    targetY = event.y;
	run();
};

// Math.pow(x,2)












