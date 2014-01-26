require.config({
	paths : {
		'app' : 'app',
		'main' : 'main',
		'map' : 'map',
		'require.config' : 'require.config',
		'jquery.hotkeys' : 'libs/jquery.hotkeys',
		'jquery' : 'libs/jquery',
		'require' : 'libs/require',
		'stats' : 'libs/stats',
		'debug_manager' : 'managers/debug_manager',
		'gamepad_manager' : 'managers/gamepad_manager',
		'garbage_collector' : 'managers/garbage_collector',
		'map_manager' : 'managers/map_manager',
		'utils' : 'managers/utils',
		'bullet' : 'models/bullet',
		'case' : 'models/case',
		'player' : 'models/player',
		'world' : 'models/world',
	},
	shim : {
		'jquery.hotkeys' : ['jquery'],
		'stats' : { 'exports' : 'stats' },
	}
});
