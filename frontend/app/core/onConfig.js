import routes from './routes';

const onConfig = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'config', '$httpProvider', ($stateProvider, $urlRouterProvider, $locationProvider, config, $httpProvider) => {

	routes.forEach((route) => {
		console.log("are you here");
		$stateProvider.state(route.name, route.opts);  
	});
	$urlRouterProvider.otherwise('/');

	if (!window.TEST_ENV) {
		$locationProvider.html5Mode(true);
	}
}];

export default onConfig;