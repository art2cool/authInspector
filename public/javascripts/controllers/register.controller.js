
angular.module('MyApp')
    .controller('RegisterController', ['UserApi', function(UserApi) {
        console.log('hi from register controller');
        this.user = {};
        this.submit = function () {
            UserApi.registerUser(this.user);
        };
    }]);
