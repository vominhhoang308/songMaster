const songsCtrl = ['$scope','songsService', ($scope, songsService) => {
	const vm = {};
	vm.postMetaTag = postMetaTag;
	vm.getMetaTag = getMetaTag;

	init();  

	function init(){
		songsService.fetchSong().then((data) => {
			$scope.songs = data.data.sort(function(a,b){return (a.difficulty > b.difficulty) ? -1 : ((b.difficulty >a.difficulty) ? 1 : 0);} );
		});
	}

	function postMetaTag(id){
		songsService.postMetaTag(id).then((data) => {

		});
	}

	return vm;
}];

export default songsCtrl;
