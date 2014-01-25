require.config({
	paths : {
		'app' : 'app',
		'main' : 'main',
		'require.config' : 'require.config',
		'jquery.hotkeys' : 'libs/jquery.hotkeys',
		'jquery' : 'libs/jquery',
		'require' : 'libs/require',
		'stats' : 'libs/stats',
		'camera_manager' : 'managers/camera_manager',
		'collider_manager' : 'managers/collider_manager',
		'debug_manager' : 'managers/debug_manager',
		'gamepad_manager' : 'managers/gamepad_manager',
		'input_manager' : 'managers/input_manager',
		'movement_manager' : 'managers/movement_manager',
		'render_manager' : 'managers/render_manager',
		'utils' : 'managers/utils',
		'world' : 'models/world',
	},
	shim : {
		'jquery.hotkeys' : ['jquery'],
		'stats' : { 'exports' : 'stats' },
	}
});
