
angular.module('MyApp')
    .controller('UsersController', ['$location', 'UserApi', function($location, UserApi) {
        console.log('hi from books controller');
    //    this.users = ["1715", "Zibert", "LeW", "Guse"];

        this.users = UserApi.users;
        console.log(this.users);
    }]);
