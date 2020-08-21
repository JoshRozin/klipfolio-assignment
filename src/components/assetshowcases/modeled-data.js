import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModeledData } from "../../redux/actions/dataActions";

const ModeledData = (props) => {
	// for skeleton loading
	const loadingTemplate = ["", "", "", "", "", ""];
	// Redux store and hooks
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.data.modelled_data.loading);
	const data = useSelector((state) => state.data.modelled_data.data);
	useEffect(() => {
		// Get the modeled data on mount
		dispatch(getModeledData());

		return () => {};
	}, []);

	return (
		<div class="asset-showcase-wrapper">
			<h3 class="section-header">Recommended Modeled Data</h3>
			<div class="asset-card-wrapper">
				{isLoading
					? // Skeleton loading screen
					  loadingTemplate.map((template) => <div class="asset-card shadow"></div>)
					: // Map out the data
					  data.map((i) => (
							<div className="asset-card shadow" title={i.name} aria-label={i.name}>
								<div
									style={{
										position: "absolute",
										width: "100%",
										overflow: "visible",
										zIndex: "1",
									}}
								>
									<h5 className="card-subtitle">{i.name}</h5>
								</div>
							</div>
					  ))}
			</div>
			{data.length <= 6 && (
				<div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
					<button
						className="pagination-button"
						onClick={(e) => dispatch(getModeledData())}
						disabled={isLoading}
					>
						More Services
					</button>
				</div>
			)}
		</div>
	);
};

export default ModeledData;
