import React, { useEffect, useContext } from "react";
import Species from "./Species";
import SearchBarPokemon from "./SearchBarPokemon";
import {
  createPokeId,
  sortPokedexAsc,
  sortPokedexDsc,
  sortNameAsc,
  sortNameDsc,
} from "../Assets/sortPokemon";
import MakeRegularListSprite from "./MakeRegularListSprite";
import MakeFilteredListSprite from "./MakeFilteredListSprite";
import { Navigation } from "../App";
import BackButton from "./BackButton";

export default function PokeList() {
  const nav = useContext(Navigation);

  useEffect(() => {
    const getPokeList = async () => {
      const response = await fetch(nav.data.generation.url);
      let data = await response.json();
      data = createPokeId(data.pokemon_species);
      data = sortPokedexAsc(data);
      nav.set("speciesList", data);
    };

    getPokeList();
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
        <>
          <div className="fixedBar">
            <div id="container">
              <h1>
                <u>
                  Browsing Generation{" "}
                  {parseInt(nav.data.generation.url.split("/").slice(-2, -1))}
                </u>
              </h1>
              <SearchBarPokemon
                doSort={doSort}
                searchQuery={nav.data.searchQueryPokemon}
                setSearchQuery={nav.set}
              />
            </div>
          </div>
          <BackButton back={"fromPokeList"} />
          <div className="pokemonContainer">
            {nav.data.speciesList ? (
              nav.data.searchQueryPokemon ? (
                <MakeFilteredListSprite
                  list={nav.data.speciesList}
                  searchQuery={nav.data.searchQueryPokemon}
                  setPokemon={nav.set}
                  sprite={nav.data.generation.sprite}
                />
              ) : (
                <MakeRegularListSprite
                  list={nav.data.speciesList}
                  setPokemon={nav.set}
                  sprite={nav.data.generation.sprite}
                />
              )
            ) : (
              "Loading Pokemon, Please wait..."
            )}
          </div>
        </>
      )}
    </>
  );
}
