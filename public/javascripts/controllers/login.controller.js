
angular.module('MyApp')
    .controller('LoginController', ['UserApi', function(UserApi) {
        this.user = {};
        this.submit = function () {
            UserApi.loginUser(this.user);
        };
    }]);
