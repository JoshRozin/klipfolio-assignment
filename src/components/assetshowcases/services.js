import React, { useEffect } from "react";
import { getServices } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Services = (props) => {
	// for skeleton loading
	const loadingTemplate = ["", "", "", "", "", ""];
	// Redux store and hooks
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.data.services.loading);
	const data = useSelector((state) => state.data.services.data);

	useEffect(() => {
		// Get the services on mount
		dispatch(getServices());

		return () => {};
	}, []);

	return (
		<div class="asset-showcase-wrapper">
			<h3 class="section-header">Recommended Services</h3>
			<div class="asset-card-wrapper">
				{isLoading
					? // Skeleton loading screen
					  loadingTemplate.map((template) => <div class="asset-card shadow space-card"></div>)
					: // Map out data
					  data.map((data) => (
							<div
								className="flex-center flex-column space-card"
								title={data.name}
								aria-label={data.name}
							>
								<h5 className="asset-label">{data.name}</h5>
								<div className="service-card shadow">
									<img src={data.icon_url} className="service-icon" />
								</div>
							</div>
					  ))}
			</div>
			{data.length <= 6 && (
				<div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
					<button className="pagination-button" onClick={(e) => dispatch(getServices())} disabled={isLoading}>
						More Services
					</button>
				</div>
			)}
		</div>
	);
};

export default Services;
