const functions = require("firebase-functions");
const env = functions.config();

const express = require("express");

const FBAuth = require("./util/fbAuth");
const axios = require("axios").default;
//Algolia stuff
const algoliasearch = require("algoliasearch");
const search = algoliasearch(env.algolia.id, env.algolia.key);
const searchIndex = search.initIndex("search");
//Sendgrid mail stuff

const {
	db,
	adminFirestore,
	// search
} = require("./util/admin");

const cors = require("cors");
const app = express();
//CORS
app.use(cors({ origin: true }));
app.options("*", cors());
//Algolia Index
// const timelinejoinindex = search.initIndex('timeline_joins');

const { getRecommendedServices } = require("./handlers/services");
const { getRecommendedMetrics } = require("./handlers/metrics");
const { getRecommendedModelledMetrics } = require("./handlers/modelled-data");

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
// This function will only be available by authentication.
app.get("/modelled-data/:count", FBAuth, getRecommendedModelledMetrics);
app.get("/services/:count", getRecommendedServices);
app.get("/metrics/:count", getRecommendedMetrics);

exports.api = functions.region("us-east1").https.onRequest(app);

// This function will take the search reference data and will update the info in algolia-search.
exports.indexSearchResults = functions
	.region("us-east1")
	.firestore.document("search/{id}")
	.onWrite(async (change) => {
		const changeAfter = change.after.data();
		await searchIndex.partialUpdateObject(
			{
				...changeAfter,
				objectID: change.after.id,
			},
			(err, content) => {
				if (err) throw err;

				console.log(content);
			}
		);
	});
