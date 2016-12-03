const songsService = ['$http', 'config', ($http, config) => {
	const service = {};

	/*===========================================
	=            songs Interface            =
	===========================================*/
	
	service.fetchSong = fetchSong;
	service.searchSong = searchSong;

	/*======================================
	=            Implementation            =
	======================================*/
	function fetchSong() {
		let url = `${config.BASEURL}/songs`;
		return $http({
			url: url,
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
	}

	function postMetaTag(id){

	}

	function searchSong(key){
		console.log("are you here1231312");
		let url = `${config.BASEURL}/songs/search?phrase=${key}`;
		return $http({
			url:url,
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	}

	return service;
}];


export default songsService;