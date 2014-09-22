angular.module('untitled', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('untitled').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'partial/main/main.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

angular.module('untitled').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
