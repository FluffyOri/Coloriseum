// requestAnimationFrame shim by Paul Irish @link http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();


var gamepadActive = false,        // whether a gamepad is connected or not
    ps3Buttons    = new Array(),  // an array of button id's which map to the button names
    keys          = new Array();  // an array of key "keyCodes" that map to the gamepad button id's

// building the button ID's to the button names
ps3Buttons[12]  = 'triangle',
ps3Buttons[15]  = 'square',
ps3Buttons[14]  = 'cross',
ps3Buttons[13]  = 'circle',
ps3Buttons[4]   = 'up',
ps3Buttons[7]   = 'left',
ps3Buttons[6]   = 'down',
ps3Buttons[5]   = 'right',
ps3Buttons[10]  = 'L1',
ps3Buttons[8]   = 'L2',
ps3Buttons[11]  = 'R1',
ps3Buttons[9]   = 'R2',
ps3Buttons[1]   = 'L3',
ps3Buttons[2]   = 'R3',
ps3Buttons[16]  = 'PS',
ps3Buttons[0]   = 'select',
ps3Buttons[3]   = 'start';

// the mapped keyCode's to gamepad button ID's
keys[38] = 4; // up
keys[37] = 7; // left
keys[40] = 6; // down
keys[39] = 5; // right

// sets the gamepad connection state to true
function gamepadConnected(evt)
{
  //console.log(evt);
  gamepadActive = true;
}

// sets the gamepad connection state to false
function gamepadDisconnected(evt)
{
  // console.log(evt);
  gamepadActive = false;
}

// when a keyboard or gamepad button is pressed, this is called
// it sets whether a button is being pressed to the player object
// the pressed state alters based on whether a key is pressed or released
// e.g. up button/key is pressed, player.up = true/false
function buttonPressed(evt, pressed)
{
  console.log(evt.button, pressed);
  player[ps3Buttons[evt.button]] = pressed ? true : false;
}
function moveAnalogueSticks(evt) {
  //console.log(evt.axis, evt.value);
}

// event listeners, self explanatory
window.addEventListener('MozGamepadConnected', gamepadConnected);
window.addEventListener('MozGamepadDisconnected', gamepadDisconnected);
window.addEventListener("MozGamepadButtonDown", function(evt) { buttonPressed(evt, true); } );
window.addEventListener("MozGamepadButtonUp", function(evt) { buttonPressed(evt, false); } );
window.addEventListener("MozGamepadAxisMove", moveAnalogueSticks);

// if a gamepad is not in use
// prevent the default action of the key and then use the "keys"
// mapping array to send through the gamepad button ID
window.onkeydown = function(evt)
  {
    if (gamepadActive == false)
    {
      evt.preventDefault();
      buttonPressed({ button: keys[evt.keyCode] }, true);
    }
  }
window.onkeyup = function(evt)
  {
    if (gamepadActive == false)
    {
      evt.preventDefault();
      buttonPressed({ button: keys[evt.keyCode] }, false);
    }
  }

// get the canvas context and create two new images
var canvas  = document.getElementById('game'),
    ctx     = canvas.getContext('2d'),
    ship    = new Image(),
    space   = new Image();

// set the source of the image objects
space.src = "space.jpg";
ship.src  = "ship.png";

// player object
var player = {
  x: 200,
  y: 250,                               // to maintain coordinates of where the player is
  up: false,
  down: false,
  left: false,
  right: false,                         // button states, to know which buttons are being held down
  render: function() {
    this.updatePosition();              // move the ship's x and y coordinate
    ctx.drawImage(ship,this.x,this.y);  // draw the ship to the canvas
  },
  updatePosition: function() {
    this.up     ? this.y-- : false;
    this.down   ? this.y++ : false;
    this.left   ? this.x-- : false;
    this.right  ? this.x++ : false;     // check which button is being pressed and then alter it's coordinates
  }
}

// draw the space image and then render the player
function renderGame()
{
  ctx.drawImage(space,0,0);
  player.render();
}

// the self invoking animation loop
;(function animloop(){
  requestAnimFrame(animloop);
  renderGame();
})();