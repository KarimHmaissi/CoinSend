/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		console.log('/userController index');

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
		console.log(req.body);
		User.create(req.body).exec(function(err, user) {
			if(err || !user.id) {
				console.log(err);
				return res.redirect('/');
			}

			req.session.authenticated = true;
			req.session.user = user;

			return res.redirect('/' + user.username);

			// Wallet.create({publicKey: req.body.publicKey, owner: user.id, cointype: req.body.cointype}).exec(function (err, wallet) {
			// 	if(err) { 
			// 		console.log(err);
			// 		return res.redirect('/');
			// 	 }

			// 	req.session.username = user.username;

			// 	return res.redirect('/' + user.username);

			// });

		});
	},

	edit: function (req, res) {
		console.log('/userController edit');
		var username = req.param('username');
		if(!username) { 

			//flash message
			res.redirect('/'); 
		}

		User.findOneByUsername(username).populate('wallets').exec(function (err, user) {
			if(err || user.length < 1) {
				//flash error
				return res.redirect('/');
			}

			return res.view('editWallet', {'user': user});
		});
	},

	signin: function (req, res) {
		console.log('/userController signIn');

		return res.view('signin');
	},

	signout: function (req, res) {
		console.log('/userController singOut');
		req.session.destroy();

		return res.redirect('/');
	},

	signInPost: function (req, res) {
		console.log('/userController signInPost');

		User.findOneByUsername(req.body.username).exec(function (err, user) {
			if(err || !user) {
				//Flash error
				console.log('Cant find user');
				return res.redirect('/signin');
			} else if(!req.body.password) {
				//Flash error
				console.log('Wrong password');
				return res.redirect('/' + 'signin');
			}

			console.log('About to login');
			console.log(req.body.password);
			console.log(user.password);
			console.log(user);

			if(req.body.password === user.password) {
				console.log('Successfully logged in');
				req.session.authenticated = true;
				req.session.user = user;

				return res.redirect('/' + user.username + '/edit');
			} else {
				//Flash error
				console.log('Wrong password');
				return res.redirect('/' + user.username);
			}
		})
	}
};

