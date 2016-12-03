const onRun = ['$rootScope', '$state', '$http', 'config', ($rootScope, $state, $http, config) => {
	// register rootScope variables
	$rootScope.baseUrl = config.BASEURL;

	// register the translations that can not be evaluated in the expressions

	$rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
		console.log('abc');
	});
}];

export default onRun;
