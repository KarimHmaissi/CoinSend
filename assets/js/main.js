(function () {
	
	var init = function () {

		console.log('Running');

		$('.add-wallet__show-form-button').on('click', function () {
			$('.add-wallet').addClass('open');
		});

		$('.add-wallet__form').on('submit', function (e, body) {
			e.preventDefault();

			var formdata = $(this).serializeArray();
			var data = {};
			$(formdata ).each(function(index, obj){
			    data[obj.name] = obj.value;
			});
			console.log(data);


			$.ajax({url: '/wallet/create', data})
			.done(function (res) {
				console.log(res);
			}) 
			.fail(function (error) {
				console.log(error);
			});
		});		

	};

	$(function () {
		init();
	});
})();