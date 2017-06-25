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
	},

	create: function (req, res) {
		console.log('walletController create');
		console.log(req.body);

		// if(!req.body.owner) { return res.json({'error': 'no id fam'}); }

		User.find({id: req.body.owner}).exec(function (err, user) {

			if(err || user.length < 1) {
				//add flash error

				return res.redirect('/awesome');
			}

			req.body.owner = user[0].id;

			Wallet.create(req.body).exec(function(err, wallet) {
				if(err || !wallet.id) {
					//add flash error
					console.log(err);
					return res.redirect('/' + req.session.user.username + '/edit');
				}

				return res.redirect('/' + req.session.user.username + '/edit');
			});
		})
		
	},

	delete: function (req, res) {
		console.log('WalletController Delete');
		console.log(req.body);

		//check wallet is owned by logged in user TODO

		// if(!req.body.id) { return res.json({'error': 'No id fam'}); }

		Wallet.destroy({id: req.body.id}).exec(function (err) {
			if(err) {
				return res.redirect('/' + req.session.user.username + '/edit');
			}
			return res.redirect('/' + req.session.user.username + '/edit');

		});
	}
};

