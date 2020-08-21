import axios from "axios";

import {
	LOADING_SERVICES,
	SET_SERVICES,
	LOADING_METRICS,
	SET_METRICS,
	LOADING_MODELLED_DATA,
	SET_MODELLED_DATA,
} from "../types";

export const getServices = () => async (dispatch, getState) => {
	const state = getState();
	dispatch({ type: LOADING_SERVICES });

	await axios
		.get(`https://us-east1-klipfolio-interview.cloudfunctions.net/api/services/${state.data.services.data.length}`)
		.then((res) => {
			console.log(res);
			dispatch({ type: SET_SERVICES, payload: res.data });
		})
		.catch((err) => {
			console.error(err);
		});
};

export const getMetrics = () => async (dispatch, getState) => {
	const state = getState();
	dispatch({ type: LOADING_METRICS });
	await axios
		.get(`https://us-east1-klipfolio-interview.cloudfunctions.net/api/metrics/${state.data.metrics.data.length}`)
		.then((res) => {
			console.log(res);
			dispatch({ type: SET_METRICS, payload: res.data });
		})
		.catch((err) => {
			console.error(err);
		});
};

// This function requires an authentication. See: /components/authenticateOnRefresh.js
export const getModeledData = () => async (dispatch, getState) => {
	const state = getState();
	dispatch({ type: LOADING_MODELLED_DATA });
	await axios
		.get(
			`https://us-east1-klipfolio-interview.cloudfunctions.net/api/modelled-data/${state.data.metrics.data.length}`
		)
		.then((res) => {
			console.log(res);
			dispatch({ type: SET_MODELLED_DATA, payload: res.data });
		})
		.catch((err) => {
			console.error(err);
		});
};
