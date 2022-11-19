import React, { useEffect, useContext } from "react";
import config from "../config";
import Species from "./Species";
import SearchBarPokemon from "./SearchBarPokemon";
import {
  createPokeId,
  sortPokedexAsc,
  sortPokedexDsc,
  sortNameAsc,
  sortNameDsc,
} from "../Assets/sortPokemon";
import MakeRegularList from "./MakeRegularList";
import MakeFilteredList from "./MakeFilteredList";
import { Navigation } from "../App";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";

export default function Pokedex() {
  const nav = useContext(Navigation);

  useEffect(() => {
    const getPokedexList = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_SPECIES + "?offset=0&limit=0"
      );
      let data = await response.json();

      const response2 = await fetch(
        config.BASE_API_DOMAIN +
          config.ENDPOINT_SPECIES +
          "?offset=0&limit=" +
          data.count
      );
      data = await response2.json();
      data = createPokeId(data.results);
      data = sortPokedexAsc(data);
      nav.set("speciesList", data);
    };

    getPokedexList();
    // eslint-disable-next-line
  }, []);

  function doSort(sortType) {
    let newList = nav.data.speciesList.map((data) => data);
    switch (sortType) {
      case "pokedex-asc": {
        nav.set("speciesList", sortPokedexAsc(newList));
        break;
      }
      case "pokedex-dsc": {
        nav.set("speciesList", sortPokedexDsc(newList));
        break;
      }
      case "alphabet-asc": {
        nav.set("speciesList", sortNameAsc(newList));
        break;
      }
      case "alphabet-dsc": {
        nav.set("speciesList", sortNameDsc(newList));
        break;
      }
      default: {
        nav.set("speciesList", sortPokedexAsc(newList));
        break;
      }
    }
  }

  return (
    <>
      {nav.data.species ? (
        <Species url={nav.data.species} />
      ) : (
        <div>
          <div className="fixedBar">
            <div id="container">
              <h1>
                <u>Search entire Pokédex</u>
              </h1>
              <SearchBarPokemon
                doSort={doSort}
                searchQuery={nav.data.searchQueryPokemon}
                setSearchQuery={nav.set}
              />
            </div>
          </div>
          <Link to="/">
            <BackButton back={"fromPokedex"} />
          </Link>
          <div className="pokemonContainer">
            {nav.data.speciesList ? (
              nav.data.searchQueryPokemon ? (
                <MakeFilteredList
                  list={nav.data.speciesList}
                  searchQuery={nav.data.searchQueryPokemon}
                  setPokemon={nav.set}
                />
              ) : (
                <MakeRegularList
                  list={nav.data.speciesList}
                  setPokemon={nav.set}
                />
              )
            ) : (
              "Loading Pokemon, Please wait..."
            )}
          </div>
        </div>
      )}
    </>
  );
}
