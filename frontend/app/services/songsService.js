const songsService = ['$http', 'config', ($http, config) => {
	const service = {};

	/*===========================================
	=            songs Interface            =
	===========================================*/
	
	service.fetchSong = fetchSong;

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

	return service;
}];


export default songsService;