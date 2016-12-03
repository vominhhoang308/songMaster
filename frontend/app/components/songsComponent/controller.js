const songsCtrl = ['$scope','songsService', ($scope, songsService) => {
	const vm = {};

	init();  

	function init(){		 
		songsService.fetchSong().then((data) => {
			$scope.songs = data.data;
		});
	}

	return vm;
}];

export default songsCtrl;
