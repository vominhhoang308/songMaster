const starRating = [function(scope) {
          return {
                    restrict: 'A',
                    template: '<ul class="rating">' +
                              '<li ng-repeat="star in stars" ng-class="star">' +
                              '\u2605' +
                              '</li>' +
                              '</ul>',
                    scope: {
                              ratingValue: '=',
                              max: '='
                    },
                    link: function(scope, element, attrs) {
                              scope.stars = [];
                              for (var i = 0; i < scope.max; i++) {
                                        scope.stars.push({
                                                  filled: i < scope.ratingValue
                                        });
                              }
                    }
          };

}];

export default starRating;
