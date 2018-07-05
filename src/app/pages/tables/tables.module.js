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
          controller: 'TablesPageCtrl',
          title: 'Transactions',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        })
        .state('tables.suspicious', {
          url: '/suspicious',
          templateUrl: 'app/pages/tables/basic/tables.html',
          title: 'Suspicious',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('tables.alltransactions', {
          url: '/alltransactions',
          templateUrl: 'app/pages/tables/smart/tables.html',
          title: 'All Transactions',
          sidebarMeta: {
            order: 100,
          },
        });
    $urlRouterProvider.when('/tables','/tables/suspicious');
  }

})();
