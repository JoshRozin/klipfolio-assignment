import React, { useState } from "react";
import {
	InstantSearch,
	Highlight,
	connectSearchBox,
	connectRefinementList,
	Configure,
	Index,
	connectStateResults,
	connectHits,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
const algoliaClient = algoliasearch("6GKY596I9Y", "cc06c7ce1f8544648827c1949ccb75b9");

const searchClient = {
	search(requests) {
		return algoliaClient.search(requests);
	},
};
const SearchBox = ({ currentRefinement, refine, setShowHits }) => {
	return (
		<div className="search-input-wrapper">
			<input
				className="search-input"
				type="search"
				id="search_box"
				value={currentRefinement}
				onChange={(event) => {
					refine(event.currentTarget.value);
				}}
				placeholder="Search"
				inputMode="search"
				onFocus={(e) => setShowHits(true)}
				onBlur={(e) =>
					setTimeout(() => {
						setShowHits(false);
					}, 200)
				}
			/>
			<button className="search-button">Search</button>
		</div>
	);
};
const formatTags = ({ items, isFromSearch, refine, searchForItems, createURL }) => {
	return items.map((item, index) => {
		return (
			<button className="tag" key={item.label} onClick={(e) => console.log("Redirect goes here")}>
				<label style={{ color: "inherit", cursor: "inherit" }}>{item.label}</label>
			</button>
		);
	});
};
const CustomSearchBox = connectSearchBox(SearchBox);
const ConnectedHits = connectHits(Hits);
const CustomTags = connectRefinementList(formatTags);

const Search = (props) => {
	const [showHits, setShowHits] = useState(false);
	return (
		<div className="search-wrapper">
			<InstantSearch indexName="search" searchClient={searchClient}>
				<CustomSearchBox type="search" setShowHits={setShowHits} />

				{showHits && (
					<div className="hit-wrapper shadow ">
						<div className="flex-start">
							<CustomTags attribute="tags" limit={5} />
						</div>
						<ConnectedHits></ConnectedHits>
					</div>
				)}
			</InstantSearch>
		</div>
	);
};

function Hits(props) {
	return props.hits.map((hit) => (
		<a className="search-result" onClick={(e) => console.log("Redirect goes here")}>
			<strong>{hit.asset_name}</strong>
			<sub>{hit.asset_category}</sub>
		</a>
	));
}

export default Search;
