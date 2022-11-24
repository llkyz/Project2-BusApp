import React from "react";
import magnifyingGlass from "../Assets/search.svg";
import { doSortLocation } from "../Assets/sortPokemon";

export default function SearchBarLocation(props) {
  function sortSelected(event) {
    let newList = doSortLocation(
      event.target.value,
      props.regionData.locations
    );
    props.setRegionData({ ...props.regionData, locations: newList });
    props.setSearchBar({
      ...props.searchBar,
      sortQuery: event.target.value,
    });
  }

  return (
    <div className="searchBar" style={{ marginBottom: "20px", width: "100%" }}>
      <div style={{ width: "50%", display: "flex" }}>
        <img src={magnifyingGlass} id="magnifyingGlass" alt="search" />
        <label id="search">
          <input
            type="text"
            placeholder="Search"
            id="searchInput"
            spellCheck="false"
            autoComplete="off"
            value={props.searchBar.searchQuery}
            onChange={(event) =>
              props.setSearchBar({
                ...props.searchBar,
                searchQuery: event.currentTarget.value,
              })
            }
          />
        </label>
      </div>
      <div className="sorting">
        <label htmlFor="sorting">Sort by:</label>
        <select
          name="sorting"
          id="sort"
          onChange={(event) => sortSelected(event)}
          defaultValue={props.searchBar.sortQuery}
        >
          <option value="alphabet-asc">Alphabetical Ascending</option>
          <option value="alphabet-dsc">Alphabetical Descending</option>
        </select>
      </div>
    </div>
  );
}
