import React, { useMemo, useCallback } from "react";
import { AreaClosed, Line, Bar, LinePath } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { GridRows, GridColumns } from "@vx/grid";
import { scaleTime, scaleLinear } from "@vx/scale";
import { withTooltip, Tooltip, defaultStyles } from "@vx/tooltip";
import { WithTooltipProvidedProps } from "@vx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@vx/event";
import { LinearGradient } from "@vx/gradient";
import { max, extent, bisector } from "d3-array";
import { timeFormat } from "d3-time-format";
import { Group } from "@vx/group";

// ---IMPORTANT DISCLAIMER---
// Credit: This code can be found here: https://vx-demo.now.sh/areas though I had to create adjustments to
// allow for the margins, convert Typescript into Javascript, and allow for custom data to be used.

// Colors
export const background = "rgb(57, 154, 202)";
export const background2 = "rgb(57, 154, 202)";
export const accentColor = "rgb(57, 154, 202)";
export const accentColorDark = "#75daad";

const tooltipStyles = {
	...defaultStyles,
	background,
	border: "1px solid white",
	color: "white",
};

// util
const formatDate = timeFormat("%b %d, '%y");

// accessors
const getDate = (d) => new Date(d.date);
const getStockValue = (d) => d.value;
const bisectDate = bisector((d) => new Date(d.date)).left;

const LineChart = ({
	width,
	height,
	margin = { top: 0, right: 0, bottom: 0, left: 0 },
	showTooltip,
	hideTooltip,
	tooltipData,
	tooltipTop = 0,
	tooltipLeft = 0,
	stock,
}) => {
	// bounds
	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;

	// scales
	const dateScale = useMemo(
		() =>
			scaleTime({
				range: [0, xMax],
				domain: extent(stock, getDate),
			}),
		[xMax]
	);
	const stockValueScale = useMemo(
		() =>
			scaleLinear({
				range: [yMax, 0],
				domain: [0, (max(stock, getStockValue) || 0) + yMax / 3],
				nice: true,
			}),
		[yMax]
	);

	// tooltip handler
	const handleTooltip = useCallback(
		(event) => {
			const { x } = localPoint(event) || { x: 0 };
			const x0 = dateScale.invert(x);
			const index = bisectDate(stock, x0, 1);
			const d0 = stock[index - 1];
			const d1 = stock[index];
			let d = d0;
			if (d1 && getDate(d1)) {
				d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
			}
			showTooltip({
				tooltipData: d,
				tooltipLeft: x,
				tooltipTop: stockValueScale(getStockValue(d)),
			});
		},
		[showTooltip, stockValueScale, dateScale]
	);

	// if (width < 10) return null;

	return (
		<>
			<svg width={width} height={height}>
				<LinearGradient
					id="area-gradient"
					from={accentColor}
					to={accentColor}
					toOpacity={0.1}
					fromOpacity={0.5}
				/>
				<Group top={margin.top}>
					<AreaClosed
						data={stock}
						x={(d) => dateScale(getDate(d))}
						y={(d) => stockValueScale(getStockValue(d))}
						yScale={stockValueScale}
						fill="url(#area-gradient)"
						curve={curveMonotoneX}
					/>{" "}
					<LinePath
						data={stock}
						x={(d) => dateScale(getDate(d))}
						y={(d) => stockValueScale(getStockValue(d))}
						// yScale={stockValueScale}
						strokeWidth={3}
						stroke={"rgb(57, 154, 202)"}
						curve={curveMonotoneX}
						strokeLinecap="round"
					></LinePath>
					<Bar
						x={0}
						y={0}
						width={width - margin.right - margin.left}
						height={height - margin.bottom - margin.top}
						fill="transparent"
						rx={14}
						onTouchStart={handleTooltip}
						onTouchMove={handleTooltip}
						onMouseMove={handleTooltip}
						onMouseLeave={() => hideTooltip()}
					/>
					{/* {tooltipData && (
						<g>
							<Line
								from={{ x: tooltipLeft, y: -margin.top - margin.bottom }}
								to={{ x: tooltipLeft, y: height }}
								stroke={accentColorDark}
								strokeWidth={2}
								pointerEvents="none"
								strokeDasharray="5,2"
							/>
							<circle
								cx={tooltipLeft}
								cy={tooltipTop + 1}
								r={4}
								fill="black"
								fillOpacity={0.1}
								stroke="black"
								strokeOpacity={0.1}
								strokeWidth={2}
								pointerEvents="none"
							/>
							<circle
								cx={tooltipLeft}
								cy={tooltipTop}
								r={4}
								fill={accentColorDark}
								stroke="white"
								strokeWidth={2}
								pointerEvents="none"
							/>
						</g>
					)} */}
				</Group>
			</svg>
			{/* Tooltip: If it's necessary. */}
			{/* {tooltipData && (
				<div>
					<Tooltip top={tooltipTop - 12} left={tooltipLeft + 12} style={tooltipStyles}>
						{`$${getStockValue(tooltipData)}`}
					</Tooltip>
					<Tooltip
						top={yMax - 14}
						left={tooltipLeft}
						style={{
							...defaultStyles,
							minWidth: 72,
							textAlign: "center",
							transform: "translateX(-50%)",
						}}
					>
						{formatDate(getDate(tooltipData))}
					</Tooltip>
				</div>
			)} */}
		</>
	);
};

export default withTooltip(LineChart);
