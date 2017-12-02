(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
        .state('usuarios', {
            parent: 'app',
            url: '/usuarios',
            data: {
                authorities: [],
                pageTitle: 'Título prov'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/usuarios/usuarios.html',
                    controller: 'UsuariosController',
                    controllerAs: 'vm'
                }
            },            
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
        
        .state('usuario-detail', {
            parent: 'usuarios',
            url: '/{login}',
            data: {
                authorities: [],
                pageTitle: 'user-management.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/usuarios/usuario-detail.html',
                    controller: 'UsuarioDetailController',
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
