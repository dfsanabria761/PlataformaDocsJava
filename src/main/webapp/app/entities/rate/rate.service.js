(function() {
    'use strict';
    angular
        .module('plataformaDocsApp')
        .factory('Rate', Rate);

    Rate.$inject = ['$resource', 'DateUtils'];

    function Rate ($resource, DateUtils) {
        var resourceUrl =  'api/rates/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.dateRated = DateUtils.convertDateTimeFromServer(data.dateRated);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
