const { admin, db } = require("./admin");

module.exports = async (req, res, next) => {
	// First make sure the user has the token.
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
		idToken = req.headers.authorization.split("Bearer ")[1];
	} else {
		console.error("No token found");
		return res.status(403).json({ error: "Unauthorized" });
	}
	// *Do some kind of authentication verification here*

	// For the assigment, since we don't need to set up user accounts, I'll just grab the only one in the database.
	return db
		.collection("users")
		.doc("user")
		.get()
		.then((userDoc) => {
			if (userDoc.exists) {
				req.user = userDoc.data();
				return next();
			} else {
				return res.status(403).json({ error: "User document does not exists" });
			}
		});
};
