import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import rootReducer from './reducers/index'
import createRootReducer from "./reducers/index";

const middleware = [thunk];

export default function configureStore(preloadedState) {
	const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(createRootReducer(), preloadedState, composeEnhancer(applyMiddleware(...middleware)));

	return store;
}

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
