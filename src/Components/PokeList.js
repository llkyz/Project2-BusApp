import React, { useState, useEffect } from "react";
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

export default function PokeList(props) {
  const [pokeData, setPokeData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemon, setPokemon] = useState("");

  useEffect(() => {
    const getPokeList = async () => {
      const response = await fetch(props.url);
      let data = await response.json();
      data = createPokeId(data.pokemon_species);
      data = sortPokedexAsc(data);
      setPokeData(data);
    };

    getPokeList();
  }, [props.url]);

  function doSort(sortType) {
    let newList = pokeData.map((data) => data);
    switch (sortType) {
      case "pokedex-asc": {
        setPokeData(sortPokedexAsc(newList));
        break;
      }
      case "pokedex-dsc": {
        setPokeData(sortPokedexDsc(newList));
        break;
      }
      case "alphabet-asc": {
        setPokeData(sortNameAsc(newList));
        break;
      }
      case "alphabet-dsc": {
        setPokeData(sortNameDsc(newList));
        break;
      }
      default: {
        setPokeData(sortPokedexAsc(newList));
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
            <u>
              Browsing Generation {parseInt(props.url.split("/").slice(-2, -1))}
            </u>
          </h1>
          <div className="pokemonContainer">
            <SearchBarPokemon
              setSearchQuery={setSearchQuery}
              doSort={doSort}
              searchQuery={searchQuery}
            />
            {pokeData ? (
              searchQuery ? (
                <MakeFilteredListSprite
                  list={pokeData}
                  searchQuery={searchQuery}
                  setPokemon={setPokemon}
                  sprite={props.sprite}
                />
              ) : (
                <MakeRegularListSprite
                  list={pokeData}
                  setPokemon={setPokemon}
                  sprite={props.sprite}
                />
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
