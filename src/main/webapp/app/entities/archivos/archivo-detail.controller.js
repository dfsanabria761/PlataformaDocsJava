(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('ArchivoDetailController', ArchivoDetailController);

    ArchivoDetailController.$inject = ['$scope', 'Principal', 'LoginService', '$state','Auth','ProfileService'];

    function ArchivoDetailController ($scope, Principal, LoginService, $state,Auth, ProfileService,) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.$state = $state;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;

            });
        }
        function register () {
            $state.go('register');
        }

        

        var credentials = {accessKeyId: 'AKIAJXXCEVL457EGVDFQ', secretAccessKey: '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'};
        AWS.config.update(credentials);
        AWS.config.region = 'us-east-2';

        // create bucket instance
        var bucket = new AWS.S3({params: {Bucket: 'platformadocs'}});

        var fileChooser = document.getElementById('file-chooser');
        var button = document.getElementById('upload-button');
        var results = document.getElementById('results');
        button.addEventListener('click', function() {
            if(fileChooser==null){
                return;
            }
            var file = fileChooser.files[0];

            var extension = file.type.split("/");
            if(extension[1] == "pdf")
            {
                if (file) {

                results.innerHTML = '';

                var params = {Key: file.name, ContentType: file.type, Body: file};
                bucket.upload(params, function (err, data) {
                    results.innerHTML = err ? 'ERROR!' : 'SUBIDO.';
                });
            } else {
                results.innerHTML = 'Nada para subir.';
            }
            }
            else{
                results.innerHTML = "El formato del archivo no está permitido, solo se pueden subir archivos .pdf"
            }
            
        }, false);
        var delimiters = {
            Bucket: "platformadocs",
            Delimiter: "/",
            EncodingType: "url"
        };

         
        bucket.listObjects(delimiters, function (err, response) {
            var pdf = "<img src=https://image.flaticon.com/icons/svg/337/337946.svg alt='PDF' width='70' height='70'>";
            if (err) {
                results.innerHTML = ("Error al subir datos: ", err);
            } else {
                for(var i = 0; i < response.Contents.length; i++){
                    results.insertAdjacentHTML('beforeend', pdf);
                    results.insertAdjacentHTML('beforeend', '<a href="https://s3-us-east-2.amazonaws.com/' 
                    + delimiters.Bucket + delimiters.Delimiter 
                    + response.Contents[i].Key 
                    + '" target="_blank">' 
                    + response.Contents[i].Key 
                    + '</a>');
                }
            }                
        });

    }
})();
