angular.module('MyApp')
    .service('AuthInspector', ['AuthToken', "$q", '$injector', function(AuthToken, $q, $injector) {

        return {

            request: function(config) {
                var token = AuthToken.getToken();
                if (token) {
                    config.headers.authorization = 'Bearer ' + token;
                }
                return config;
            },
            response: function(response) {


                return response;
            },
            responseError: function (responseError) {
                if(responseError.status === 401) {
                    AuthToken.removeToken();
                       $injector.get('$state').transitionTo('login');
                       return $q.reject(responseError);
                   }
                   else {
                       return $q.reject(responseError);
               }

            }
        };


    }]);
