var canvasManager = {};

canvasManager.init = function(width, height) {
    var canvas = document.getElementById("canvas");
    this.width = width;
    this.height = height;
    canvas.width  = width;
    canvas.height = height;
	this.context = canvas.getContext('2d');
}

canvasManager.clean = function() {
	   
    if(dashing)
        this.context.globalAlpha = 0.1;

    else
        this.context.globalAlpha = 1;

    this.context.fillStyle = "silver";
    this.context.fillRect(0, 0 , this.width , this.height);
};
