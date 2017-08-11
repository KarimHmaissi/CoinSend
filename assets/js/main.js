(function () {

	var formValidate = function () {
		$(".signupForm").validate({
			rules: {
				username: "required",
				password: {
					required: true,
					minlength: 7
				}
			},
			messages: {
				username: "Please enter your custom URL",
				password: "A password must be a minimum of 7 characters"
			}
		});

		$(".addWalletForm").validate({
			rules: {
				publicKey: {
					required: true,
					minlength: 12
				}
			},
			messages: {
				publicKey: "Please enter a valid public wallet address"
			}
		});

	};


	var qrCodeGen = function () {
		

	};

	var crawlWallet = function () {
		var wallets = $('.wallet');

		

		var crawlEtherWallet = function (publicKey, walletEl) {
			var walletUrl =  'https://api.etherscan.io/api?module=account&action=balance&tag=latest&address=' + publicKey;
			$.ajax({url: walletUrl})	
			.done(function (data) {
				console.log(data);
				var formatted = parseInt(data.result) / 1000000000000000000;
				var newFormatted = formatted.toFixed(4);
				walletEl.find('.balance').html(formatted);
			});
		};

		wallets.each(function (i) {
			var wallet = $(this);
			var publicKey = wallet.attr('data-publicKey');
			var coinType = wallet.attr('data-coinType');
			if(coinType === 'ethereum') {
				setTimeout(function () {
					crawlEtherWallet(publicKey, wallet);
				}, 200);
			}
		})
		

		
	}
	
	var init = function () {

		console.log('Running');

		formValidate();
		qrCodeGen();
		crawlWallet();	
	};

	$(function () {
		init();
	});
})();