/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables', [])
    .config(routeConfig)

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tables', {
          url: '/tables',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Transactions',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        })
        .state('tables.suspicious', {
          url: '/suspicious',
          templateUrl: 'app/pages/tables/smart/tables.html',
          title: 'Suspicious',
          sidebarMeta: {
            order: 0,
          },
          resolve : {
            SuspiciousData : function($q,TransactionService){
                 return TransactionService.fetchSuspiciousTxn();
            }
          },
          controller: function(SuspiciousData, $scope){
                console.log('SuspiciousData['+SuspiciousData+']');
                $scope.smartTableData = SuspiciousData;
                $scope.smartTablePageSize = 10;
          }
        })
        .state('tables.alltransactions', {
          url: '/alltransactions',
          templateUrl: 'app/pages/tables/basic/tables.html',
          title: 'All Transactions',
          sidebarMeta: {
            order: 100,
          },
          resolve : {
            AllTxnData : function($q,TransactionService){
                 return TransactionService.fetchAllTransactions();
            }
          },
          controller: function(AllTxnData, $scope){
                console.log('AllTxnData['+AllTxnData+']');
                $scope.AllTxnData = AllTxnData;
                $scope.smartTablePageSize = 10;
          }
        });
    $urlRouterProvider.when('/tables','/tables/suspicious');
  }

})();
