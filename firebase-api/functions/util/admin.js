const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
// const env = functions.config();
// const search = algoliasearch(env.algolia.appid, env.algolia.adminapikey);

const adminFirestore = admin.firestore;

module.exports = {
	admin,
	db,
	adminFirestore
	// search
};
