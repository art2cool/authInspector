
angular.module('MyApp')
    .controller('UsersController', ['$location', 'UserApi', function($location, UserApi) {

        this.users = UserApi.users;

    }]);
