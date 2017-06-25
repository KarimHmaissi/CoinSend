(function () {

	var formValidate = function () {
		$(".signupForm").validate({
			rules: {
				username: "required",
				password: {
					required: true,
					minlength: 6
				},
				// confirm_password: {
				// 	required: true,
				// 	minlength: 5,
				// 	equalTo: "#password"
				// },
				publicKey: {
					required: true,
					minlength: 12,
				},
				// topic: {
				// 	required: "#newsletter:checked",
				// 	minlength: 2
				// },
				// agree: "required"
			},
			messages: {
				username: "Please enter your custom URL",
				password: "A password must be a minimum of 7 characters",
				publicKey: "You must add a valid wallet address"
			}
		});

	};
	
	var init = function () {

		console.log('Running');

		formValidate();

		// $('.activate-edit-mode').on('click', function () {
		// 	$('body').toggleClass('edit-mode-active');
		// });

		// $('.wallet__modify').on('click', function () {
		// 	var publicKey = $(this).parent().attr('data-publicKey');
		// 	console.log('Modifying wallet: ', publicKey);
		// });

		// $('.wallet__delete').on('click', function (e) {
		// 	e.preventDefault();

		// 	var id = $(this).parent().attr('data-publicKey');
		// 	var wallet = $(this).parents('.wallet').remove();
		// 	console.log('Deleting wallet: ', id);
		// 	// console.log('Deleting wallet: ', owner);

		// 	var data = {id: id};

		// 	$.ajax({url: '/wallet/delete', data, method: 'POST'})
		// 	.done(function (res) {
		// 		console.log(res);
		// 	}) 
		// 	.fail(function (error) {
		// 		console.log(error);
		// 	});

		// });

		// $('.add-wallet__form').on('submit', function (e) {
		// 	console.log('add wallet form');
		// 	e.preventDefault();

		// 	var formdata = $(this).serializeArray();
		// 	var data = {};
		// 	$(formdata ).each(function(index, obj){
		// 	    data[obj.name] = obj.value;
		// 	});
		// 	console.log(data);

		// 	$.ajax({url: '/wallet/create', data, method: 'POST'})
		// 	.done(function (res) {
		// 		console.log(res);
		// 		// window.location.href=window.location.href;

		// 	}) 
		// 	.fail(function (error) {
		// 		console.log(error);
		// 	});
		// });		

	};

	$(function () {
		init();
	});
})();