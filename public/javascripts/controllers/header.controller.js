
angular.module('MyApp')
    .controller('HeaderController', ['$location', 'AuthToken', 'UserApi', function($location, AuthToken, UserApi) {
        this.isActive = function (route) {
            return route === $location.path();
        };
        this.logout = function () {
            UserApi.logout();
        };
        this.isAuthenticated = AuthToken.isAuthenticated;
    }]);
