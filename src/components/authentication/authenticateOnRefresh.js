import React from "react";
import Axios from "axios";

// This function will authenticate the user on page load.
const AuthenticateOnRefresh = (props) => {
	// Since the assignment doesn't require authentication, this will just set an "auth token" (currently a bunch of characters
	// I smashed on my keyboard) to the header of the HTTP request package (using axios). I would normally put this function on
	// the server-side if it's an SSR app, or store it as a cookie, or in a useEffect hook. Then
	// I would keep the user information in Redux.
	Axios.defaults.headers.common["Authorization"] = "Bearer 1yd1928d91j2ij19inmsma98v81j24ij321i4j1983j4";
	return null;
};

export default AuthenticateOnRefresh;
