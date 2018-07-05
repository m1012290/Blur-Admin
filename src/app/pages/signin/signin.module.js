(function () {
  'use strict';

  angular.module('BlurAdmin.pages.signin', [])
  .config(routeConfig)
  .controller('SigninPageCtrl', SigninPageCtrl)
  .service('SigninService', signinservice);

function SigninPageCtrl($scope,$rootScope,$state,$stateParams,SigninService, $uibModal){
  console.log('printing call to signinservice');
  $scope.username = '';
  $scope.password = '';
  $scope.signinfn = function(){
     console.log('printing call to signin function');
     if($scope.username === '' || $scope.password === ''){
        //alert the user that no inputs are provided
        console.log('invalid inputs, Please enter valid values');
        $uibModal.open({
          animation: true,
          templateUrl: "/app/pages/signin/autherrormodal.html",
          size:"sm",
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });  
     }else{
        SigninService.loginauth($scope.username,$scope.password).then(function(data){
          $rootScope.hideSideBarForLogin = false;
          $state.transitionTo('dashboard',$stateParams,{location:"true",reload: true});
        }).catch(function(err){
          console.log('error invoking login api');
          $uibModal.open({
          animation: true,
          templateUrl: "/app/pages/signin/authinvalidcredentials.html",
          size:"sm",
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });
        });
     }
  }

  $scope.open = function (page, size) {
      $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };


}



function signinservice($q,$resource,$timeout){
   return {
      loginauth : function(username,password){
          var deferred = $q.defer();
          var resource = $resource("http://localhost:8080/api/login");
          resource.save({email:username,password:password},function(data){
             deferred.resolve(data);
          },function(err){
             deferred.reject(err);
          });
          return deferred.promise;
      }
   }
}

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
       .state('signin', {
         url: '/signin',
         templateUrl: 'app/pages/signin/auth.html',
         title: 'Sign In',
         controller: 'SigninPageCtrl'
       });
  }

})();
