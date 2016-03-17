
angular.module('MyApp')
    .controller('RegisterController', ['UserApi', function(UserApi) {
        this.user = {};
        this.submit = function () {
            UserApi.registerUser(this.user);
        };
    }]);
