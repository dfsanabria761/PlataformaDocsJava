(
	function() 
	{
		'use strict';

		angular
		.module('plataformaDocsApp')

		.controller('ArchivosController', ArchivosController);
		ArchivosController.$inject = ['File','$scope', 'Principal', 'LoginService', '$state','Auth','ProfileService'];

		function ArchivosController (File,$scope, Principal, LoginService, $state,Auth, ProfileService)
		{

			var vm = this;
			vm.archivos =[];
			$scope.materias = [{key:"ANA",nombre:"Análisis y Decisión de Inversión",urls:[]},{key:"FISI1",nombre:"Física 1",urls:[]},{key:"FISI2",nombre:"Física 2",urls:[]},{key:"APO1",nombre:"APO 1",urls:[]}
			,{key:"APO2",nombre:"APO 2",urls:[]},{key:"DIFE",nombre:"Cálculo Diferencial",urls:[]},{key:"INTE",nombre:"Cálculo Integral",urls:[]},{key:"VECTO",nombre:"Cálculo Vectorial",urls:[]}
			,{key:"PROBA1",nombre:"Probabilidad y estadística 1",urls:[]},{key:"PROBA2",nombre:"Probabilidad y estadística 2",urls:[]}];
			vm.account = null;
			vm.isAuthenticated = null;
			vm.login = LoginService.open;
			vm.register = register;
			vm.$state = $state;
			vm.file = {};
			$scope.$on('authenticationSuccess', function() 
			{
				getAccount();
			});

			getAccount();

			 function onSaveSuccess (result) {
           		 $scope.$emit('plataformaDocsApp:fileUpdate', result);
          	  vm.isSaving = false;
       		 }

       		 function onSaveError () {
           		 vm.isSaving = false;
        		}


			function getAccount() 
			{
				Principal.identity().then(function(account) 
				{
					vm.account = account;
					vm.isAuthenticated = Principal.isAuthenticated;

				});
			}
			function register () 
			{
				$state.go('register');
			}
			function save () {
                File.save(vm.file, onSaveSuccess, onSaveError);
       		}



			var credentials = {accessKeyId: 'AKIAJXXCEVL457EGVDFQ', secretAccessKey: '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'};
			AWS.config.update(credentials);
			AWS.config.region = 'us-east-2';

			var materia = "";

			$("#tableMenu a").click(function(e)
			{
			e.preventDefault(); // cancel the link behaviour
			var selText = $(this).text();
			materia = selText;
			$("#tableButton").text(selText);
		});


		// create bucket instance
		var bucket = new AWS.S3({params: {Bucket: 'platformadocs'}});

		var fileChooser = document.getElementById('file-chooser');
		var button = document.getElementById('upload-button');
		var results = document.getElementById('results');

		button.addEventListener('click', function() 
		{
			if(fileChooser == null || materia == "")
			{
				return;
			}
			var file = fileChooser.files[0];
			console.log(file);

			var newFile = "";

			for (var i = 0; i < $scope.materias.length; i++)
			{
				if(materia == $scope.materias[i].nombre)
				{
					newFile = $scope.materias[i].key + "-" + $scope.materias[i].nombre;
					i = $scope.materias.length;
				}
			}

			vm.file.name = file.name;
			var extension = file.type.split("/");
			if(extension[1] == "pdf")
			{
				if (file) 
				{
					results.innerHTML = '';
					
					var params = {Key: newFile, ContentType: file.type, Body: file};
					var action = bucket.upload(params, function (err, data) 
					{
						results.innerHTML = err ? 'Ups, algo sucedió :(' : '!Tu archivo fue correctamente subido!'; 
						if(results.innerHTML == err)
						{
							results.innerHTML = 'Ups, algo sucedió :(';
						}
						else
						{
							results.innerHTML = '¡Tu archivo fue correctamente subido!';
							vm.file.route= data.Location.toString();
							console.log(vm.file);
							File.save(vm.file, onSaveSuccess, onSaveError);
			 			}
					});
				} 
				else 
				{
					results.innerHTML = 'Nada para subir.';
				}
			}
			else
			{
				results.innerHTML = "El formato del archivo no está permitido, solo se pueden subir archivos .pdf"
			}
		}, false);
		

		var delimiters = {
			Bucket: "platformadocs",
			Delimiter: "/",
			EncodingType: "url"
		};

		bucket.listObjects(delimiters,function (err, response)
		{
			for(var i = 0; i < response.Contents.length; i++)
			{
				for(var j = 0; j < $scope.materias.length; j++)
				{
					if(response.Contents[i].Key.startsWith($scope.materias[j].key))
					{
						var url = "https://s3-us-east-2.amazonaws.com/" 
						+ delimiters.Bucket 
						+ delimiters.Delimiter 
						+ response.Contents[i].Key;
						$scope.materias[j].urls.push( {url:url,fileName:response.Contents[i].Key});
					}
				}
			}
			$scope.$apply();
		});
	}
})();