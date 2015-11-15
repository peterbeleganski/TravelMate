var app = angular.module('app',['ngResource','ngRoute','ngAnimate']).value('toastr',toastr);

app.config(function($routeProvider, $locationProvider){
    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/',{
            templateUrl: '/partials/home/home',
            controller : 'HomeCtrl'
        })
        .when('/ads',{
            templateUrl:'/partials/home/ads',
            controller:'HomeCtrl'
        })
        .when('/sign-up',{
            templateUrl: '/partials/account/sign-up',
            controller: 'SignUpCtrl'
        })
        .when('/view',{
            templateUrl: '/partials/home/view-laptop',
            controller: 'HomeCtrl'
        })
        .when('/login',{
            templateUrl: '/partials/account/login',
            controller: 'LoginCtrl'
        })
        .when('/profile',{
            templateUrl:'/partials/account/profile',
            controller:'ProfileCtrl',
            resolve:routeUserChecks.authenticated
        })
});

app.run(function($rootScope, $location, notifier) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            notifier.warning('You have to login first!')
        }
    })
});