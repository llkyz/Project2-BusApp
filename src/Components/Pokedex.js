import React, { useState, useEffect } from "react";
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

export default function Pokedex() {
  const [pokedexData, setPokedexData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemon, setPokemon] = useState("");

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
      setPokedexData(data);
    };

    getPokedexList();
  }, []);

  function doSort(sortType) {
    let newList = pokedexData.map((data) => data);
    switch (sortType) {
      case "pokedex-asc": {
        setPokedexData(sortPokedexAsc(newList));
        break;
      }
      case "pokedex-dsc": {
        setPokedexData(sortPokedexDsc(newList));
        break;
      }
      case "alphabet-asc": {
        setPokedexData(sortNameAsc(newList));
        break;
      }
      case "alphabet-dsc": {
        setPokedexData(sortNameDsc(newList));
        break;
      }
      default: {
        setPokedexData(sortPokedexAsc(newList));
        break;
      }
    }
  }

  return (
    <>
      {pokemon ? (
        <Species url={pokemon} back={setPokemon} />
      ) : (
        <div className="generationDiv">
          <h1>
            <u>Search entire Pokédex</u>
          </h1>
          <div className="pokemonContainer">
            <SearchBarPokemon
              setSearchQuery={setSearchQuery}
              doSort={doSort}
              searchQuery={searchQuery}
            />
            {pokedexData ? (
              searchQuery ? (
                <MakeFilteredList
                  list={pokedexData}
                  searchQuery={searchQuery}
                  setPokemon={setPokemon}
                />
              ) : (
                <MakeRegularList list={pokedexData} setPokemon={setPokemon} />
              )
            ) : (
              "Loading, Please wait..."
            )}
          </div>
        </div>
      )}
    </>
  );
}
