import React, { useState, useEffect } from "react";
import Species from "./Species";
import SearchBarPokemon from "./SearchBarPokemon";
import MakeRegularList from "./MakeRegularList";
import MakeFilteredList from "./MakeFilteredList";
import { Link, useParams, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import { LoadingImgLarge } from "../Assets/cleanup";
import {
  fullPokedex,
  otherSearch,
  generationSearch,
  typeSearch,
} from "../Assets/pokedexSearch";

export default function Pokedex() {
  const [pokemonData, setPokemonData] = useState("");
  const [searchBar, setSearchBar] = useState({
    searchQuery: "",
    sortQuery: "",
  });
  const [species, setSpecies] = useState();
  const [selectForm, setSelectForm] = useState();
  const params = useParams();
  const location = useLocation();
  let extended = false;
  if (params.type === "type") {
    extended = true;
  }

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
      } else if (params.type === "type") {
        setSpecies();
        typeSearch(setPokemonData, location.state.source);
      }
    },
    // eslint-disable-next-line
    [params.type, location.state]
  );

  return (
    <>
      {species ? (
        <Species data={species} selectForm={selectForm} />
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
                  extended={extended}
                  setSelectForm={setSelectForm}
                />
              ) : (
                <MakeRegularList
                  pokemonData={pokemonData}
                  setSpecies={setSpecies}
                  extended={extended}
                  setSelectForm={setSelectForm}
                />
              )
            ) : (
              <LoadingImgLarge />
            )}
          </div>
        </div>
      )}
    </>
  );
}
