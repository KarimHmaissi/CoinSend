/**
 * Wallet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	schema: true,

	attributes: {
		publicKey: {
			type: 'text',
			required: true
		},

		owner: {
			model: 'user'
		},

		cointype: {
			type: 'text',
			required: true
		}
	}
};

