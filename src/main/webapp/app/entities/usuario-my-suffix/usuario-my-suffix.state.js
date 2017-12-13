(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('usuario-my-suffix', {
            parent: 'app',
            url: '/usuario-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'plataformaDocsApp.usuario.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/usuario-my-suffix/usuariosmySuffix.html',
                    controller: 'UsuarioMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('usuario');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('usuario-my-suffix-detail', {
            parent: 'usuario-my-suffix',
            url: '/usuario-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'plataformaDocsApp.usuario.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/usuario-my-suffix/usuario-my-suffix-detail.html',
                    controller: 'UsuarioMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('usuario');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Usuario', function($stateParams, Usuario) {
                    return Usuario.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'usuario-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('usuario-my-suffix-detail.edit', {
            parent: 'usuario-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/usuario-my-suffix/usuario-my-suffix-dialog.html',
                    controller: 'UsuarioMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Usuario', function(Usuario) {
                            return Usuario.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('usuario-my-suffix.new', {
            parent: 'usuario-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/usuario-my-suffix/usuario-my-suffix-dialog.html',
                    controller: 'UsuarioMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('usuario-my-suffix', null, { reload: 'usuario-my-suffix' });
                }, function() {
                    $state.go('usuario-my-suffix');
                });
            }]
        })
        .state('usuario-my-suffix.edit', {
            parent: 'usuario-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/usuario-my-suffix/usuario-my-suffix-dialog.html',
                    controller: 'UsuarioMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Usuario', function(Usuario) {
                            return Usuario.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('usuario-my-suffix', null, { reload: 'usuario-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('usuario-my-suffix.delete', {
            parent: 'usuario-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/usuario-my-suffix/usuario-my-suffix-delete-dialog.html',
                    controller: 'UsuarioMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Usuario', function(Usuario) {
                            return Usuario.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('usuario-my-suffix', null, { reload: 'usuario-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
