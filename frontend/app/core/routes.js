const routes = [
  {
      name: 'home',
      opts: {
        url: '/',
        templateUrl: './assets/angular/tpls/home.html'
      }
  },
  {
    name: 'song',
    opts: {
      url: '/songs',
      templateUrl: './assets/angular/tpls/songs.html'
    }
  },
  {
    name: 'aboutme',
    opts: {
      url: '/aboutme',
      templateUrl: './assets/angular/tpls/aboutme.html'
    }
  }
];

export default routes;
