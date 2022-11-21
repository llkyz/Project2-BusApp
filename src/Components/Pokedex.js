import React, { useState, useEffect } from "react";
import Species from "./Species";
import SearchBarPokemon from "./SearchBarPokemon";
import MakeRegularList from "./MakeRegularList";
import MakeFilteredList from "./MakeFilteredList";
import { Link, useParams, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import {
  fullPokedex,
  otherSearch,
  generationSearch,
} from "../Assets/pokedexSearch";

export default function Pokedex() {
  const [pokemonData, setPokemonData] = useState("");
  const [searchBar, setSearchBar] = useState({
    searchQuery: "",
    sortQuery: "",
  });
  const [species, setSpecies] = useState();
  const params = useParams();
  const location = useLocation();

  useEffect(
    () => {
      if (params.type === "full") {
        setSpecies();
        fullPokedex(setPokemonData);
      } else if (params.type === "generation") {
        setSpecies();
        generationSearch(setPokemonData, location.state);
      } else if (params.type === "other") {
        setSpecies();
        otherSearch(setPokemonData, location.state.source);
      }
    },
    // eslint-disable-next-line
    [params.type, location.state]
  );

  return (
    <>
      {species ? (
        <Species data={species} />
      ) : (
        <div>
          <div className="fixedBar">
            <div id="container">
              <h1>
                <u>{location.state.title}</u>
              </h1>
              <SearchBarPokemon
                setSearchBar={setSearchBar}
                searchBar={searchBar}
                setPokemonData={setPokemonData}
                pokemonData={pokemonData}
              />
            </div>
          </div>
          <Link to="/">
            <BackButton back={"fromPokeList"} />
          </Link>
          <div className="pokemonContainer">
            {pokemonData ? (
              searchBar.searchQuery ? (
                <MakeFilteredList
                  pokemonData={pokemonData}
                  searchBar={searchBar}
                  setSpecies={setSpecies}
                />
              ) : (
                <MakeRegularList
                  pokemonData={pokemonData}
                  setSpecies={setSpecies}
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
