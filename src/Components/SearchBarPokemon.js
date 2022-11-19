import React from "react";
import magnifyingGlass from "../Assets/search.svg";

export default function SearchBarPokemon(props) {
  return (
    <div className="searchBar">
      <div style={{ width: "50%", display: "flex" }}>
        <img src={magnifyingGlass} id="magnifyingGlass" alt="search" />
        <label id="search">
          <input
            type="text"
            placeholder="Search"
            id="searchInput"
            spellCheck="false"
            autoComplete="off"
            value={props.searchQuery}
            onChange={(event) =>
              props.setSearchQuery(
                "searchQueryPokemon",
                event.currentTarget.value
              )
            }
          />
        </label>
      </div>
      <div className="sorting">
        <label htmlFor="sorting">Sort by:</label>
        <select
          name="sorting"
          id="sort"
          onChange={(event) => props.doSort(event.target.value)}
        >
          <option value="pokedex-asc" defaultValue>
            Pokédex # Ascending
          </option>
          <option value="pokedex-dsc">Pokédex # Descending</option>
          <option value="alphabet-asc">Alphabetical Ascending</option>
          <option value="alphabet-dsc">Alphabetical Descending</option>
        </select>
      </div>
    </div>
  );
}
