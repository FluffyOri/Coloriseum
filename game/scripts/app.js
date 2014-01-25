define({
	canvas        : null,
	ctx           : null,
	GAME_WIDTH    : 800,
	GAME_HEIGHT   : 500,
	SCENE_WIDTH   : 800,
	SCENE_HEIGHT  : 500,
    topLeftAnchor     = { x : 0,    y : 0 },
    topRightAnchor    = { x : 1024, y : 0 },
    bottomLeftAnchor  = { x : 0,    y : 768 },
    bottomRightAnchor = { x : 1024, y : 768 },
    colors = {
        blue   : "rgb(66, 27, 121)",
        orange : "rgb(252, 176, 64)",
        pink   : "rgb(240, 103, 167)",
        green  : "rgb(60, 187, 149)"
    }
});