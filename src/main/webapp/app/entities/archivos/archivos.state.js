(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
        .state('archivos', {
            parent: 'app',
            url: '/files',
            data: {
                authorities: [],
                pageTitle: 'Título prov'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/archivos/archivos.html',
                    controller: 'ArchivosController',
                    controllerAs: 'vm'
                }
            },    
            onEnter:['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/archivos/archivos.html',
                        controller: 'ArchivosController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg'
                    }).result.then(function() {
                        $state.go('archivos');
                    }, function() {
                        $state.go('archivos');
                    });
                }],        
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {

                   // return {
                   //     page: PaginationUtil.parsePage($stateParams.page),
                    //    sort: $stateParams.sort,
                    //    predicate: PaginationUtil.parsePredicate($stateParams.sort),
                   //     ascending: PaginationUtil.parseAscending($stateParams.sort)
                   // };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {

                    $translatePartialLoader.addPart('user-management');
                    return $translate.refresh();
                }]

            }
        })
        
        .state('archivo-detail', {
            parent: 'archivos',
            url: '/{id}',
            data: {
                authorities: [],
                pageTitle: 'user-management.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/archivos/archivo-detail.html',
                    controller: 'ArchivoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('user-management');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
