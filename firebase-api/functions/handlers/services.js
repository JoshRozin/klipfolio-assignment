const { admin, db, adminFirestore } = require("../util/admin");

// This function will return 6 recommended services at a time
exports.getRecommendedServices = (req, res) => {
	const count = typeof req.params.count === "undefined" ? 0 : parseInt(req.params.count);
	console.log(count);
	return db
		.collection("services")
		.orderBy("id", "desc")
		.offset(count)
		.limit(6)
		.get()
		.then((resdata) => {
			let responsedata = [];
			resdata.forEach((doc) => {
				var data = doc.data();
				console.log(data);
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
