import { combineReducers } from "redux";

import dataReducer from "./dataReducer";

export default (history) =>
	combineReducers({
		data: dataReducer,
	});
