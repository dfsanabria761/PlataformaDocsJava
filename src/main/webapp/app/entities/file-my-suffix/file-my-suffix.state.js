(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('file-my-suffix', {
            parent: 'entity',
            url: '/file-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'plataformaDocsApp.file.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/file-my-suffix/filesmySuffix.html',
                    controller: 'FileMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('file');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('file-my-suffix-detail', {
            parent: 'file-my-suffix',
            url: '/file-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'plataformaDocsApp.file.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/file-my-suffix/file-my-suffix-detail.html',
                    controller: 'FileMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('file');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'File', function($stateParams, File) {
                    return File.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'file-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('file-my-suffix-detail.edit', {
            parent: 'file-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file-my-suffix/file-my-suffix-dialog.html',
                    controller: 'FileMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['File', function(File) {
                            return File.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('file-my-suffix.new', {
            parent: 'file-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file-my-suffix/file-my-suffix-dialog.html',
                    controller: 'FileMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                route: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('file-my-suffix', null, { reload: 'file-my-suffix' });
                }, function() {
                    $state.go('file-my-suffix');
                });
            }]
        })
        .state('file-my-suffix.edit', {
            parent: 'file-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file-my-suffix/file-my-suffix-dialog.html',
                    controller: 'FileMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['File', function(File) {
                            return File.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('file-my-suffix', null, { reload: 'file-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('file-my-suffix.delete', {
            parent: 'file-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file-my-suffix/file-my-suffix-delete-dialog.html',
                    controller: 'FileMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['File', function(File) {
                            return File.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('file-my-suffix', null, { reload: 'file-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
