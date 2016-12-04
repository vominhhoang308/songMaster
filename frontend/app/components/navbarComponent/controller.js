const navCtrl = ['$scope', ($scope) => {
	const vm = {};

	vm.toggleMenu = toggleMenu;

	function toggleMenu () {
		let $menu = angular.element(document.querySelector('.side-nav'));
		if ($menu.hasClass('active')){
			$menu.removeClass('active');
		} else {
			angular.element(document.querySelector('.side-nav')).toggleClass('active');	
		}		
	}

	return vm;
}];

export default navCtrl;