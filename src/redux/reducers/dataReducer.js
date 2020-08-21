import {
	LOADING_SERVICES,
	SET_SERVICES,
	LOADING_METRICS,
	SET_METRICS,
	LOADING_MODELLED_DATA,
	SET_MODELLED_DATA,
} from "../types";

const initialState = {
	services: { loading: false, data: [] },
	metrics: { loading: false, data: [] },
	modelled_data: { loading: false, data: [] },
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_SERVICES:
			return {
				...state,
				services: { ...state.services, loading: true },
			};
		case SET_SERVICES:
			return {
				...state,
				services: {
					...state.services,
					data: [...state.services.data, ...action.payload],
					loading: false,
				},
			};
		case LOADING_METRICS:
			return {
				...state,
				metrics: { ...state.metrics, loading: true },
			};
		case SET_METRICS:
			return {
				...state,
				metrics: {
					...state.metrics,
					data: [...state.metrics.data, ...action.payload],
					loading: false,
				},
			};
		case LOADING_MODELLED_DATA:
			return {
				...state,
				modelled_data: { ...state.modelled_data, loading: true },
			};
		case SET_MODELLED_DATA:
			return {
				...state,
				modelled_data: {
					...state.modelled_data,
					data: [...state.modelled_data.data, ...action.payload],
					loading: false,
				},
			};
		default:
			return state;
	}
}
