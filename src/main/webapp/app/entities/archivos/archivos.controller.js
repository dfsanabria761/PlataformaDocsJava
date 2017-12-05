(
	function() 
	{
		'use strict';

		angular
		.module('plataformaDocsApp')

		.controller('ArchivosController', ArchivosController);
		ArchivosController.$inject = ['$scope', 'Principal', 'LoginService', '$state','Auth','ProfileService'];

		function ArchivosController ($scope, Principal, LoginService, $state,Auth, ProfileService)
		{

			var vm = this;
			vm.archivos =[];
			$scope.materias = [{key:"ANA",nombre:"Anadec",urls:[]},{key:"FISI",nombre:"Física",urls:[]}];
			vm.account = null;
			vm.isAuthenticated = null;
			vm.login = LoginService.open;
			vm.register = register;
			vm.$state = $state;
			$scope.$on('authenticationSuccess', function() 
			{
				getAccount();
			});

			getAccount();

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
			var newFile = "";

			if(materia == "Física")
			{
				newFile = "FISI-" + file.name;
			}
			else if(materia == "Anadec")
			{
				newFile = "ANA-" + file.name;
			}

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
							var id = 'filename' + materia;
							var modal = document.getElementById(id);

							results.innerHTML = '¡Tu archivo fue correctamente subido!';
							modal.innerHTML = newFile;
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