import React from "react";
import "./App.css";
import NavBar from "./components/layout/navbar";
import Metrics from "./components/assetshowcases/metrics";
import Services from "./components/assetshowcases/services";
import ModeledData from "./components/assetshowcases/modeled-data";
import AuthenticateOnRefresh from "./components/authentication/authenticateOnRefresh";

function App() {
	return (
		<div className="App">
			<AuthenticateOnRefresh />
			<NavBar></NavBar>
			<Metrics></Metrics>
			<Services></Services>
			<ModeledData></ModeledData>
		</div>
	);
}

export default App;
