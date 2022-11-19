import React, { useEffect, useContext } from "react";
import config from "../config";
import Species from "./Species";
import SearchBarPokemon from "./SearchBarPokemon";
import { createPokeId, sortPokedexAsc } from "../Assets/sortPokemon";
import MakeRegularList from "./MakeRegularList";
import MakeFilteredList from "./MakeFilteredList";
import { Navigation } from "../App";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import generationSprites from "../Assets/generationSprites";

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
      nav.set({
        speciesList: data,
        generation: { sprite: generationSprites.full },
      });
    };

    getPokedexList();
    // eslint-disable-next-line
  }, []);

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
              <SearchBarPokemon />
            </div>
          </div>
          <Link to="/">
            <BackButton back={"fromPokeList"} />
          </Link>
          <div className="pokemonContainer">
            {nav.data.speciesList ? (
              nav.data.searchQueryPokemon ? (
                <MakeFilteredList />
              ) : (
                <MakeRegularList />
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
