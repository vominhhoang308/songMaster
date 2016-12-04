const onRun = ['$rootScope', '$state', '$http', 'config', ($rootScope, $state, $http, config) => {
	// register rootScope variables
	$rootScope.baseUrl = config.BASEURL;
}];

export default onRun;
