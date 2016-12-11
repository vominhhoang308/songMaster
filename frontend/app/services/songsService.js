const songsService = ['$http', 'config', ($http, config) => {
	const service = {};

	/*===========================================
	=            songs Interface            =
	===========================================*/
	
	service.fetchSong = fetchSong;
	service.searchSong = searchSong;
	service.postMetaTag = postMetaTag;

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
		let url = `${config.BASEURL}/songs/${id}/meta`;
		return $http({
			url: url,
			method: 'POST'
		});
	}

	function searchSong(key){
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