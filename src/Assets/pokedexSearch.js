import {
  createPokeId,
  createPokeIdType,
  sortPokedexAsc,
} from "../Assets/sortPokemon";
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

export const generationSearch = async (setPokemonData, id) => {
  const response = await fetch(
    config.BASE_API_DOMAIN + config.ENDPOINT_GENERATION + id
  );
  let data = await response.json();
  data = createPokeId(data.pokemon_species);
  data = sortPokedexAsc(data);
  setPokemonData({
    speciesList: data,
    sprite: generationSprites[id],
  });
};

export const typeSearch = async (setPokemonData, id, setTitle) => {
  const response = await fetch(
    config.BASE_API_DOMAIN + config.ENDPOINT_TYPE + id
  );
  let data = await response.json();
  setTitle(`Searching by Type (${data.name.toUpperCase()})`);
  data = createPokeIdType(
    data.pokemon.map((data) => {
      return { name: data.pokemon.name, url: data.pokemon.url };
    })
  );
  data = sortPokedexAsc(data);
  setPokemonData({
    speciesList: data,
    sprite: generationSprites.full,
  });
};

export const colorSearch = async (setPokemonData, id, setTitle) => {
  const response = await fetch(
    config.BASE_API_DOMAIN + config.ENDPOINT_COLOR + id
  );
  let data = await response.json();
  setTitle(`Searching by Color (${data.name.toUpperCase()})`);
  data = createPokeIdType(
    data.pokemon_species.map((data) => {
      return { name: data.name, url: data.url };
    })
  );
  data = sortPokedexAsc(data);
  setPokemonData({
    speciesList: data,
    sprite: generationSprites.full,
  });
};

export const eggGroupSearch = async (setPokemonData, id, setTitle) => {
  const response = await fetch(
    config.BASE_API_DOMAIN + config.ENDPOINT_EGG_GROUP + id
  );
  let data = await response.json();
  setTitle(`Searching by Egg Group (${data.name.toUpperCase()})`);
  data = createPokeIdType(
    data.pokemon_species.map((data) => {
      return { name: data.name, url: data.url };
    })
  );
  data = sortPokedexAsc(data);
  setPokemonData({
    speciesList: data,
    sprite: generationSprites.full,
  });
};

export const habitatSearch = async (setPokemonData, id, setTitle) => {
  const response = await fetch(
    config.BASE_API_DOMAIN + config.ENDPOINT_HABITAT + id
  );
  let data = await response.json();
  setTitle(`Searching by Habitat (${data.name.toUpperCase()})`);
  data = createPokeIdType(
    data.pokemon_species.map((data) => {
      return { name: data.name, url: data.url };
    })
  );
  data = sortPokedexAsc(data);
  setPokemonData({
    speciesList: data,
    sprite: generationSprites.full,
  });
};

export const shapeSearch = async (setPokemonData, id, setTitle) => {
  const response = await fetch(
    config.BASE_API_DOMAIN + config.ENDPOINT_SHAPE + id
  );
  let data = await response.json();
  setTitle(`Searching by Shape (${data.name.toUpperCase()})`);
  data = createPokeIdType(
    data.pokemon_species.map((data) => {
      return { name: data.name, url: data.url };
    })
  );
  data = sortPokedexAsc(data);
  setPokemonData({
    speciesList: data,
    sprite: generationSprites.full,
  });
};
