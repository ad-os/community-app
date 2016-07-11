(function(module) {
    mifosX.services = _.extend(module, {
        NotificationResponseHeaderProvider: function ($q, $rootScope) {
            return {
                'response': function (response) {
                    console.log(response.headers('X-Notification-Refresh'));
                    $rootScope.$broadcast('eventFired', {
                       data: response.headers('X-Notification-Refresh')
                    });
                    return response;
                }
            }
        }
    });
    mifosX.ng.services.config(function ($provide, $httpProvider) {
        $provide.factory('NotificationResponseHeaderFactory', mifosX.services.NotificationResponseHeaderProvider);
        $httpProvider.interceptors.push(mifosX.services.NotificationResponseHeaderProvider);
    }).run(function ($log) {
        $log.info("NotificationResponseHeaderFactory initialized");
    })
}(mifosX.services || {}));