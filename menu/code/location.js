function join() {

window.location="menu/start.html";

}

function Creditsloc()  {

window.location="menu/credits.html";

}

function Retour()   {

window.location="../index.html";

}

function Confirmation()   {

window.localStorage["gameMode"] = $('input[name=Mode1]:checked').val();
window.location = "../game/index.html";
	
}
