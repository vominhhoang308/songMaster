import 'angular';
import 'angular-ui-router';
import 'ngstorage';
import 'angular-cookies';
import 'angular-truncate-2';
import 'angular-marked';
import 'angular-touch';
import 'angular-ui-bootstrap';

import config from './core/config';
import onConfig from './core/onConfig';
import onRun from './core/onRun';

import factories from './core/factoryMap';
import services from './core/serviceMap';
import components from './core/componentMap';
import controllers from './core/controllerMap';
import directives from './core/directiveMap';

const requires = [
	'ui.router',
	'ngStorage',
	'ngCookies',
	'truncate',
	'hc.marked',
	'ngTouch',
	'ui.bootstrap',
	'rzModule'
];

const ingredients = {
	factory: factories,
	service: services,
	component: components,
	controller: controllers,
	directive: directives,
};

window.app = angular.module('frontend', requires);

angular.module('frontend').constant('config', config);

// register all the ingredients
for (let type in ingredients) {
	if (ingredients.hasOwnProperty(type)) {
		for (let name in ingredients[type]) {
			if (ingredients[type].hasOwnProperty(name)) {
				angular.module('frontend')[type](name, ingredients[type][name]);
			}
		}
	}
}
// register external libs

angular.module('frontend').config(onConfig);

angular.module('frontend').run(onRun);

angular.bootstrap(document, ['frontend'], {
	strictDi: true
});
