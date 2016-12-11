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
	vm.fullSongList = fullSongList;
	vm.sortDescDiff = sortDescDiff;
	vm.sortDesc = sortDesc;
	vm.init = init;
	vm.ratingMax = 10;

	$scope.$on('checkClicked', function() {
		// vm.getMetaTag();
	});

	init();  

	function init(){
		songsService.fetchSong().then((data) => {
			$scope.songs = data.data;
			sortDesc();
			lengthTitle();
			vm.panel = 'allSong';			
		});
	}

	function sortAsc(){
		$scope.songs = $scope.songs.sort(function(a,b){return (a.ratings > b.ratings) ? 1 : ((b.ratings >a.ratings) ? -1 : 0);} );
	}

	function sortDescDiff(){
		$scope.songs = $scope.songs.sort(function(a,b){return (a.difficulty > b.difficulty) ? -1 : ((b.difficulty >a.difficulty) ? 1 : 0);} );	
	}

	function sortDesc(){
		$scope.songs = $scope.songs.sort(function(a,b){return (a.ratings > b.ratings) ? -1 : ((b.ratings >a.ratings) ? 1 : 0);} );
	}


	function sortArtist(){
		$scope.songs = $scope.songs.sort(function(a,b){return (a.artist > b.artist) ? 1 : ((b.difficulty >a.difficulty) ? -1 : 0);} );
	}

	function postMetaTag(id){
		songsService.postMetaTag(id).then((data) => {
			$scope.songs.forEach(function (song){
				if(song.id === id){
					if(data.data.Clicked === true){
						song.isClicked = true;
					} else {
						song.isClicked = false;
					}
				}
			});
		}, (err) => {
			console.log("we have an error, ", err);
		});
	}

	// function getMetaTag

	function searchSong(key){
		songsService.searchSong(key).then((data) => {
			$scope.searchSongs = data.data.sort(function(a,b){return (a.ratings > b.ratings) ? -1 : ((b.ratings >a.ratings) ? 1 : 0);} );
			vm.panel = 'searchSong';
		}, (err) => {
			console.log("we have an error, ", err);
		});
	}

	function filterDifficultyLessThan10(){
		$scope.filterList = [];
		$scope.songs.forEach( function(element, index) {
			if(element.difficulty < 10){
				$scope.filterList[$scope.filterList.length] = element;				
			}			
		});
		$scope.songs = $scope.filterList;
	}

	function switchPanel(){
		vm.panel = 'allSong';
	}

	function lengthTitle(){
		vm.totalLength = 0;
		$scope.songs.forEach(function(song){
			vm.totalLength += song.title.length;
		});

		
	}

	function fullSongList(){
		init();
	}

	return vm;
}];

export default songsCtrl;
