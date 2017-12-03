(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('ArchivosController', ArchivosController);

    ArchivosController.$inject = ['$scope', 'Principal', 'LoginService', '$state','Auth','ProfileService'];

    function ArchivosController ($scope, Principal, LoginService, $state,Auth, ProfileService,) {
        var vm = this;
        vm.archivos =[];
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
        var allItems = document.getElementById('allItems');
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

         /*
        bucket.listObjects(delimiters, function (err, response) {
            var pdf = "<img src=https://image.flaticon.com/icons/svg/337/337946.svg alt='PDF' width='70' height='70'>";
            if (err) {
                results.innerHTML = ("Error al subir datos: ", err);
            } else {
            vm.archivos=response.Contents;
            return vm.archivos;
            }
            $scope.$broadcast("REFRESH");
        });
        */
        

        bucket.listObjects(delimiters, function (err, response) 
        {
            var fileNameAna = '';
            var fileNameFisi = '';
            for(var i = 0; i < response.Contents.length; i++)
            {
                if(response.Contents[i].Key.startsWith("ANA"))
                {
                    fileNameAna += '<a href="https://s3-us-east-2.amazonaws.com/' 
                    + delimiters.Bucket 
                    + delimiters.Delimiter 
                    + response.Contents[i].Key 
                    + '" target="_blank" style="color:#0000FF">'
                    + response.Contents[i].Key 
                    + ' </a> <br></br>';
                }
                else if(response.Contents[i].Key.startsWith("FISI"))
                {
                    fileNameFisi += '<a href="https://s3-us-east-2.amazonaws.com/' 
                    + delimiters.Bucket 
                    + delimiters.Delimiter 
                    + response.Contents[i].Key 
                    + '" target="_blank" style="color:#0000FF">'
                    + response.Contents[i].Key 
                    + ' </a> <br></br>';
                }
            }
            allItems.insertAdjacentHTML("beforeend", '<div class="col-sm-4 col-md-4"'
                        + '<div class="post">'
                        + '<img src="content/images/folder.png" class="img-responsive"/>'
                        + '<span class="post-title"><b> ANADEC </b><br/> </span>'
                        + '<button class="btn btn-warning btn-sm" id="btnAnadec" data-toggle="modal" data-target="#modalAnadec">Leer más</button>'
                        + '<div class="modal fade" id="modalAnadec" role="dialog">'
                        + '<div class="modal-dialog">'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
                        + '<h4 class="modal-title" style="color:#000" >¡Mira los archivos que tenemos para ti!</h4>'
                        + '</div>'
                        + '<div class="modal-body">'
                        + '<div class="row">'
                        + '<div class=" col-sm-12">'
                        + '<p style="color:#000" class="list-group-item">' + fileNameAna + '</p>'
                        + ' </div>'
                        + ' </div>'
                        + ' </div>'
                        + '<div class="modal-footer">'
                        + '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'
                        + '</div>'
                        + ' </div>'
                        + ' </div>'
                        + ' </div>'
                        + ' </div>' 
                        + '<div class="content">'
                        + ' </div>'
                        + ' </div>'
                        + ' </div>');
            allItems.insertAdjacentHTML("beforeend", '<div class="col-sm-4 col-md-4"'
                        + '<div class="post">'
                        + '<img src="content/images/folder.png" class="img-responsive"/>'
                        + '<span class="post-title"><b> FÍSICA </b><br/> </span>'
                        + '<button class="btn btn-warning btn-sm" id="btnFisi" data-toggle="modal" data-target="#modalFisi">Leer más</button>'
                        + '<div class="modal fade" id="modalFisi" role="dialog">'
                        + '<div class="modal-dialog">'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
                        + '<h4 class="modal-title" style="color:#000" >¡Mira los archivos que tenemos para ti!</h4>'
                        + '</div>'
                        + '<div class="modal-body">'
                        + '<div class="row">'
                        + '<div class=" col-sm-12">'
                        + '<p style="color:#000" class="list-group-item">' + fileNameFisi + '</p>'
                        + ' </div>'
                        + ' </div>'
                        + ' </div>'
                        + '<div class="modal-footer">'
                        + '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'
                        + '</div>'
                        + ' </div>'
                        + ' </div>'
                        + ' </div>'
                        + ' </div>' 
                        + '<div class="content">'
                        + ' </div>'
                        + ' </div>'
                        + ' </div>');
        });
    }
})();
