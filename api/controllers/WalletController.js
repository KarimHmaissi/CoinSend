/**
 * WalletController
 *
 * @description :: Server-side logic for managing wallets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	all: function (req, res) {
		return Wallet.find().exec(function (err, wallets) {
			if(err) {
				return res.json({'error': 'No Wallets fam'})
			} 

			console.log('wallets');

			return res.json({'wallets': wallets});
		});
	}

	create: function (req, res) {

		if(req.body.id) {
			User.find({id: id}).exec(function (err, user) {

				if(err || user.length < 1) {
					return res.json({'error': err});
				}

				req.body.owner = user.id;

				Wallet.create(req.body).exec(function(err, wallet) {
					if(err || !wallet.id) {
						console.log(err);
						return res.json({'error': err});
					}

					res.json({'wallet': wallet});
				});
			})
		}

		
	}
};

