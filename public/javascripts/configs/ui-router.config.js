
angular.module('MyApp').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
        .state('main', {
            url: '/',
            views: {
                'header': {
                    templateUrl: '/templates/header.html',
                    controller: 'HeaderController as HeadCtrl'
                },
                'content': {
                    templateUrl: '/templates/main.html',
                    controller: "MainController as MainCtrl"
                }
            }
        })
        .state('register', {
            url: '/register',
            views: {
                'header': {
                    templateUrl: '/templates/header.html',
                    controller: 'HeaderController as HeadCtrl'
                },
                'content': {
                    templateUrl: '/templates/register.html',
                    controller: "RegisterController as RegCtrl"
                }
            }
        })
        .state('users', {
            url: '/users',
            views: {
                'header': {
                    templateUrl: '/templates/header.html',
                    controller: 'HeaderController as HeadCtrl'
                },
                'content': {
                    templateUrl: '/templates/users.html',
                    controller: "UsersController as UsersCtrl"
                }
            },
            resolve: {
                user: ['UserApi', function (UserApi) {
                    return UserApi.search({});
                }]                
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'header': {
                    templateUrl: '/templates/header.html',
                    controller: 'HeaderController as HeadCtrl'
                },
                'content': {
                    templateUrl: '/templates/login.html',
                    controller: "LoginController as LogCtrl"
                }
            }
        });

        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push('AuthInspector');
}]);
