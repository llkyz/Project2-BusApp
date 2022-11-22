import { createPokeId, createPokeIdType, sortPokedexAsc } from "../Assets/sortPokemon";
import config from "../config";
import generationSprites from "./generationSprites";

export const fullPokedex = async (setPokemonData) => {
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
  setPokemonData({
    speciesList: data,
    sprite: generationSprites.full,
  });
};

export const otherSearch = async (setPokemonData, source) => {
  const response = await fetch(source);
  let data = await response.json();
  data = createPokeId(data.pokemon_species);
  data = sortPokedexAsc(data);
  setPokemonData({
    speciesList: data,
    sprite: generationSprites.full,
  });
};

export const generationSearch = async (setPokemonData, state) => {
  const response = await fetch(state.source);
  let data = await response.json();
  data = createPokeId(data.pokemon_species);
  data = sortPokedexAsc(data);
  setPokemonData({
    speciesList: data,
    sprite: generationSprites[state.id],
  });
};

export const typeSearch = async (setPokemonData, source) => {
  const response = await fetch(source);
  let data = await response.json();
  data = createPokeIdType(data.pokemon.map((data)=>{return {name: data.pokemon.name, url: data.pokemon.url}}));
  data = sortPokedexAsc(data);
  setPokemonData({
    speciesList: data,
    sprite: generationSprites.full,
  });
};