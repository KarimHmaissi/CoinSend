/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		console.log('/userController index');
		console.log('url: ', req.url);

		var username = req.param('username');
		if(!username) { res.redirect('/'); }

		User.find({username: username}).populate('wallets').exec(function (err, user) {
			if(err || user.length < 1) {
				return res.redirect('/');
			}
			console.log(user);

			return res.view('wallet', {'user': user[0]});
		});
	},

	all: function (req, res) {
		return User.find().populate('wallet').exec(function (err, users) {
			if(err) {
				return res.json({'error': 'No users fam'})
			} 

			console.log('users');

			return res.json({'users': users});
		});
	},

	create: function (req, res) {
		console.log('/userController create');
		

		User.create(req.body).exec(function(err, user) {
			if(err || !user.id) {
				console.log(err);
				return res.redirect('/');
			}

			Wallet.create({publicKey: req.body.publicKey, owner: user.id}).exec(function (err, wallet) {
				if(err) { 
					console.log(err);
					return res.redirect('/');
				 }

				return res.redirect('/' + user.username);

			});

		});
	}
};

