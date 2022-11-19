import React, { useEffect, useContext } from "react";
import Species from "./Species";
import SearchBarPokemon from "./SearchBarPokemon";
import { createPokeId, sortPokedexAsc } from "../Assets/sortPokemon";
import MakeRegularList from "./MakeRegularList";
import MakeFilteredList from "./MakeFilteredList";
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
      nav.set({ speciesList: data });
    };

    getPokeList();
    // eslint-disable-next-line
  }, []);

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
                  {nav.data.generation.name.split("-")[1].toUpperCase()}
                </u>
              </h1>
              <SearchBarPokemon />
            </div>
          </div>
          <BackButton back={"fromPokeList"} />
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
        </>
      )}
    </>
  );
}
