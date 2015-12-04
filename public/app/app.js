var app = angular.module('ngMap',['ngResource','ui.bootstrap','ngRoute','ngAnimate','ngFileUpload','btford.socket-io','ngMap']).value('toastr',toastr);

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
            controller : 'MainCtrl'
        })
        .when('/test', {
            templateUrl:'/partials/main/test',
            controller:"MainCtrl"
        })
        .when('/ads',{
            templateUrl:'/partials/main/ads-board',
            controller:'MainCtrl'
        })
        .when('/create-ad',{
            templateUrl: '/partials/main/create-ad',
            controller : 'CreateAdCtrl',
            resolve:routeUserChecks.authenticated
        })
        .when('/sign-up',{
            templateUrl: '/partials/account/sign-up',
            controller: 'SignUpCtrl'
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
        .when('/users-list',{
            templateUrl:'/partials/account/users-list',
            controller:'UsersListCtrl',
            resolve:routeUserChecks.authenticated
        }).when('/users/:id',{
            templateUrl: '/partials/account/user-details',
            controller : 'UserDetailsCtrl',
            resolve:routeUserChecks.authenticated
        })
        .when('/ads/:id',{
            templateUrl: '/partials/main/details',
            controller : 'DetailsCtrl',
            resolve:routeUserChecks.authenticated
        }).when('/chat',{
            templateUrl: '/partials/main/chat',
            controller : 'chatCtrl'
        });
});



app.run(function($rootScope, $location, notifier) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            notifier.warning('You have to login first!')
        }
    })
});