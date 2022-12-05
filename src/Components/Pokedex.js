import React, { useState, useEffect } from "react";
import Species from "./Species";
import SearchBarPokemon from "./SearchBarPokemon";
import MakePokemonList from "./MakePokemonList";
import { useParams } from "react-router-dom";
import { LoadingImgLarge } from "../Assets/cleanup";
import {
  fullPokedex,
  generationSearch,
  typeSearch,
  colorSearch,
  eggGroupSearch,
  habitatSearch,
  shapeSearch,
} from "../Assets/pokedexSearch";
import Favourites from "./Favourites";

export default function Pokedex() {
  const [pokemonData, setPokemonData] = useState("");
  const [searchBar, setSearchBar] = useState({
    searchQuery: "",
    sortQuery: "",
  });
  const [species, setSpecies] = useState();
  const [selectForm, setSelectForm] = useState();
  const params = useParams();
  const [title, setTitle] = useState("");
  let extended = false;
  if (params.type === "type") {
    extended = true;
  }

  useEffect(
    () => {
      setSpecies();

      switch (params.type) {
        case "full": {
          setTitle("Browsing Entire Pokédex");
          fullPokedex(setPokemonData);
          break;
        }
        case "generation": {
          setTitle(`Browsing Generation ${params.id}`);
          generationSearch(setPokemonData, params.id);
          break;
        }
        case "type": {
          typeSearch(setPokemonData, params.id, setTitle);
          break;
        }
        case "color": {
          colorSearch(setPokemonData, params.id, setTitle);
          break;
        }
        case "egg-group": {
          eggGroupSearch(setPokemonData, params.id, setTitle);
          break;
        }
        case "habitat": {
          habitatSearch(setPokemonData, params.id, setTitle);
          break;
        }
        case "shape": {
          shapeSearch(setPokemonData, params.id, setTitle);
          break;
        }
        default: {
          console.log("ERROR");
          break;
        }
      }
    },
    // eslint-disable-next-line
    [params.type, location.state]
  );

  return (
    <>
      <Favourites />
      {species ? (
        <Species data={species} selectForm={selectForm} />
      ) : (
        <div>
          <div className="fixedBar">
            <div id="container">
              <h1>
                <u>{title}</u>
              </h1>
              <SearchBarPokemon
                setSearchBar={setSearchBar}
                searchBar={searchBar}
                setPokemonData={setPokemonData}
                pokemonData={pokemonData}
              />
            </div>
          </div>
          <div className="pokemonContainer">
            {pokemonData ? (
              searchBar.searchQuery ? (
                <MakePokemonList
                  pokemonData={pokemonData}
                  searchBar={searchBar}
                  setSpecies={setSpecies}
                  extended={extended}
                  setSelectForm={setSelectForm}
                  searchCheck={true}
                />
              ) : (
                <MakePokemonList
                  pokemonData={pokemonData}
                  setSpecies={setSpecies}
                  extended={extended}
                  setSelectForm={setSelectForm}
                  searchCheck={false}
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
