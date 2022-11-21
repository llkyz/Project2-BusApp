import React from "react";
import magnifyingGlass from "../Assets/search.svg";
import { doSort } from "../Assets/sortPokemon";

export default function SearchBarPokemon(props) {
  function sortSelected(event) {
    let newList = doSort(event.target.value, props.pokemonData);
    props.setPokemonData({ ...props.pokemonData, speciesList: newList });
    props.setSearchBar({
      ...props.searchBar,
      sortQuery: event.target.value,
    });
  }

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
          <option value="pokedex-asc">Pokédex # Ascending</option>
          <option value="pokedex-dsc">Pokédex # Descending</option>
          <option value="alphabet-asc">Alphabetical Ascending</option>
          <option value="alphabet-dsc">Alphabetical Descending</option>
        </select>
      </div>
    </div>
  );
}
