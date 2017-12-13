(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('rate-my-suffix', {
            parent: 'entity',
            url: '/rate-my-suffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'plataformaDocsApp.rate.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/rate-my-suffix/ratesmySuffix.html',
                    controller: 'RateMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('rate');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('rate-my-suffix-detail', {
            parent: 'rate-my-suffix',
            url: '/rate-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'plataformaDocsApp.rate.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/rate-my-suffix/rate-my-suffix-detail.html',
                    controller: 'RateMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('rate');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Rate', function($stateParams, Rate) {
                    return Rate.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'rate-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('rate-my-suffix-detail.edit', {
            parent: 'rate-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rate-my-suffix/rate-my-suffix-dialog.html',
                    controller: 'RateMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Rate', function(Rate) {
                            return Rate.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('rate-my-suffix.new', {
            parent: 'rate-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rate-my-suffix/rate-my-suffix-dialog.html',
                    controller: 'RateMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                dateRated: null,
                                rate: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('rate-my-suffix', null, { reload: 'rate-my-suffix' });
                }, function() {
                    $state.go('rate-my-suffix');
                });
            }]
        })
        .state('rate-my-suffix.edit', {
            parent: 'rate-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rate-my-suffix/rate-my-suffix-dialog.html',
                    controller: 'RateMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Rate', function(Rate) {
                            return Rate.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('rate-my-suffix', null, { reload: 'rate-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('rate-my-suffix.delete', {
            parent: 'rate-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rate-my-suffix/rate-my-suffix-delete-dialog.html',
                    controller: 'RateMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Rate', function(Rate) {
                            return Rate.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('rate-my-suffix', null, { reload: 'rate-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
