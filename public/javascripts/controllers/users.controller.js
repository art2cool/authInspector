
angular.module('MyApp')
    .controller('UsersController', ['$location', 'UserApi', 'CurrentUser', function($location, UserApi, CurrentUser) {

        this.users = UserApi.users;

        this.isAdmin = CurrentUser.getRole() == 'admin';
        this.removeUser = function (user) {
                UserApi.removeUser(user._id);
        };

    }]);
