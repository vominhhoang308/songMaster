const songsCtrl = ['$scope','songsService', ($scope, songsService) => {
	const vm = {};
	vm.postMetaTag = postMetaTag;
	// vm.getMetaTag = getMetaTag;
	vm.sortAsc = sortAsc;
	vm.sortArtist = sortArtist;
	vm.panel = 'allSong';
	vm.searchSong = searchSong;
	vm.switchPanel = switchPanel;
	vm.filterDifficultyLessThan10 = filterDifficultyLessThan10;

	init();  

	function init(){
		songsService.fetchSong().then((data) => {
			$scope.songs = data.data.sort(function(a,b){return (a.difficulty > b.difficulty) ? -1 : ((b.difficulty >a.difficulty) ? 1 : 0);} );
			vm.panel = 'allSong';			
		});
	}

	function sortAsc(){
		$scope.songs = $scope.songs.sort(function(a,b){return (a.difficulty > b.difficulty) ? 1 : ((b.difficulty >a.difficulty) ? -1 : 0);} );
	}

	function sortArtist(){
		$scope.songs = $scope.songs.sort(function(a,b){return (a.artist > b.artist) ? 1 : ((b.difficulty >a.difficulty) ? -1 : 0);} );
	}

	function postMetaTag(id){
		// songsService.postMetaTag(id).then((data) => {

		// });
	}

	function searchSong(key){
		songsService.searchSong(key).then((data) => {
			$scope.searchSongs = data.data.sort(function(a,b){return (a.difficulty > b.difficulty) ? -1 : ((b.difficulty >a.difficulty) ? 1 : 0);} );
			vm.panel = 'searchSong';
		});
	}

	function filterDifficultyLessThan10(){
		$scope.songs = $scope.songs.filter(function(e){ 
			e.difficulty > 10
		});
		// $scope.songs.forEach( function(element, index) {
		// 	if(element.difficulty < 10){
				
		// 	}
		// });
	}

	function switchPanel(){
		vm.panel = 'allSong';
	}

	return vm;
}];

export default songsCtrl;
