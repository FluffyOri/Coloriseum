var keys = {
    37: 'gauche',
//    81: 'gauche',
    38: 'haut',
//    90: 'haut',
    39: 'droite',
//    68: 'droite',
    40: 'bas',
//    83: 'bas',
    32: 'dash'
};

/*
// controle confus
keys[37] = droite;
keys[38] = bas;
keys[39] = gauche;
keys[40] = haut;

// controle normal
keys[37] = gauche;
keys[38] = haut;
keys[39] = droite;
keys[40] = bas;

var droite = "droite";
var gauche = "gauche";
var haut = "haut";
var bas = "bas";
*/
function setDirection(player, keyPressed, state) {
    for (var keyCode in keys) {
        if (keyPressed == keyCode) {
        	player[keys[keyCode]] = state;
        }
    };
}

document.onkeydown = function(event) {
    //Recupere le numero de touche
    var keyPressed = event.keyCode;
    console.log(keyPressed);
    for( var i = 0; i < players.length; i++) {
        setDirection(players[i], keyPressed, true);
    }
};

document.onkeyup = function(event) {
    //Recupere le numero de touche
    var keyUp = event.keyCode;
    for( var i = 0; i < players.length; i++) {
        setDirection(players[i], keyUp, false);
    }
};

document.onmousedown = function() {
    for( var i = 0; i < players.length; i++) {
            players[i].canShoot = true;
    }
}

document.onmouseup = function() {
    for( var i = 0; i < players.length; i++) {     
        players[i].canShoot = false;
    }
}

var mouseTarget = document.onmousemove = function(event) {
    targetX = event.x;
    targetY = event.y;
}


/*
var distance = Math.sqrt(sqr((targetY)- this.y) + sqr(targetX - this.x));
var angleEnnemy = Math.atan2(this.x - targetX, this.y - targetY) + Math.PI/2;
*/