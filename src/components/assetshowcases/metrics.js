import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ParentSize } from "@vx/responsive";
import { getMetrics } from "../../redux/actions/dataActions";
import LineChart from "../data-visualization/line-chart";

const Metrics = (props) => {
	// for skeleton loading
	const loadingTemplate = ["", "", "", "", "", ""];
	// Redux store and hooks
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.data.metrics.loading);
	const data = useSelector((state) => state.data.metrics.data);
	useEffect(() => {
		// Get the metrics on load
		dispatch(getMetrics());

		return () => {};
	}, []);
	return (
		<div class="asset-showcase-wrapper">
			<h3 class="section-header">Recommended Metrics</h3>
			<div class="asset-card-wrapper">
				{isLoading
					? // Using skeleton loading here
					  loadingTemplate.map((template) => <div class="asset-card shadow"></div>)
					: // Lay out the data
					  data.map((data) => (
							<div className="asset-card shadow" title={data.name} aria-label={data.name}>
								<div
									style={{
										display: "flex",
										position: "absolute",
										height: "50%",
										width: "100%",
										maxHeight: "50%",
										overflow: "visible",
										zIndex: "1",
									}}
								>
									<div
										style={{
											flexGrow: "1",
										}}
									>
										<h5 className="card-title">{data.name}</h5>
										<h5 className="card-subtitle">
											{/* Format the current value if it has a "$" */}
											{data.current_value.charAt(0) === "$" ? (
												<span style={{ verticalAlign: "super", fontSize: "0.8em" }}>
													{data.current_value.charAt(0)}{" "}
												</span>
											) : (
												data.current_value.charAt(0)
											)}
											{data.current_value.slice(1)}
										</h5>
									</div>
									<div
										style={{
											flexGrow: "1",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
										}}
										className="asset-metrics-wrapper"
									>
										<div>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												className="asset-metric-green-icon"
											>
												<path d="M17.71,11.29l-5-5a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-5,5a1,1,0,0,0,1.42,1.42L11,9.41V17a1,1,0,0,0,2,0V9.41l3.29,3.3a1,1,0,0,0,1.42,0A1,1,0,0,0,17.71,11.29Z" />
											</svg>
											<h5 className="asset-metric-green">{data.percentage_change}</h5>
										</div>
										<h5 className="asset-metric-time-horizon">
											vs. previous {data.range_change_in_days} days
										</h5>
									</div>
								</div>
								<div style={{ height: "100%", width: "100%" }}>
									<ParentSize>
										{(parent) => (
											<LineChart
												stock={data.data}
												width={parent.width}
												height={parent.height}
												margin={{ top: parent.height * 0.5, left: 0, right: 0, bottom: 0 }}
											></LineChart>
										)}
									</ParentSize>
								</div>
							</div>
					  ))}
			</div>
			{data.length <= 6 && (
				<div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
					<button className="pagination-button" onClick={(e) => dispatch(getMetrics())}>
						More Services
					</button>
				</div>
			)}
		</div>
	);
};

export default Metrics;
