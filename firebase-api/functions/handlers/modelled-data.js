const { admin, db, adminFirestore } = require("../util/admin");

// This function will return 6 recommended modelled metrics at a time
// This function will only be avalaible to logged in users.
exports.getRecommendedModelledMetrics = (req, res) => {
	const count = typeof req.params.count === "undefined" ? 0 : parseInt(req.params.count);
	console.log(count);
	console.log(req.user);
	// Only get the documents specific to the user that is currently authenticated.
	return db
		.collection("modeled-data")
		.where("uid", "==", req.user.uid)
		.offset(count)
		.limit(6)
		.get()
		.then((resdata) => {
			let responsedata = [];
			resdata.forEach((doc) => {
				console.log(doc.data());
				var data = doc.data();
				responsedata.push({
					...data,
				});
			});
			// End the response and send the response data.
			res.status(200).json(responsedata).end();
			return;
		})
		.catch((err) => {
			console.error(err);
			// Something went wrong, send them an error
			res.status(500).end();
		});
};
