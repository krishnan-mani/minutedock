define(['modules/app'], function(app){	
  app.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push(['$q','$location','$sessionStorage','$cookies',function($q, $location, $sessionStorage, $cookies) {        
        return {
            'responseError': function(rejection) {
                if(rejection.status == 401){
                    delete $sessionStorage.contacts;
                    delete $sessionStorage.projects;
                    delete $cookies.authToken;
                    delete $cookies.accountId;

                    var sendToUrl = $location.search().sendTo;
                    if(sendToUrl){
                        $location.search('sendTo', sendToUrl);
                    }
                    else if($location.url() != "/" && $location.url() != "/login") {
                        $location.search('sendTo', $location.url());
                    }
                    $location.path("/login");
                }
                return $q.reject(rejection);
            }
        };
    }]);

  }]);
});