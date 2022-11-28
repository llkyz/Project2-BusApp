import { cleanName } from "./cleanup";

export function createPokeId(myData) {
  let myList = [];
  myList = myData.map((data) => {
    return {
      name: cleanName(data.name),
      url: data.url,
      pokeid: parseInt(data.url.split("/").slice(-2, -1)),
    };
  });
  return myList;
}

export function createPokeIdType(myData) {
  let myList = [];
  myList = myData.map((data) => {
    let name = data.name.split("-");
    let firstName = cleanName(name[0]);
    name.shift();
    if (name.length > 0) {
      name = "(" + name.map((data) => data.toUpperCase()).join(" ") + ")";
    }

    return {
      name: `${firstName}\n${name}`,
      url: data.url,
      pokeid: parseInt(data.url.split("/").slice(-2, -1)),
    };
  });
  return myList;
}

export function sortPokedexAsc(myList) {
  myList.sort((a, b) => {
    let idA = a.pokeid;
    let idB = b.pokeid;
    if (idA < idB) return -1;
    else return 1;
  });
  return myList;
}

function sortPokedexDsc(myList) {
  myList.sort((a, b) => {
    let idA = a.pokeid;
    let idB = b.pokeid;
    if (idA > idB) return -1;
    else return 1;
  });
  return myList;
}

export function sortNameAsc(myList) {
  myList.sort((a, b) => {
    let idA = a.name.toLowerCase();
    let idB = b.name.toLowerCase();
    if (idA < idB) return -1;
    else return 1;
  });
  return myList;
}

function sortNameDsc(myList) {
  myList.sort((a, b) => {
    let idA = a.name.toLowerCase();
    let idB = b.name.toLowerCase();
    if (idA > idB) return -1;
    else return 1;
  });
  return myList;
}

export function replaceImage(event) {
  event.target.src =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
}

export function checkAgainstSearch(name, id, searchQuery) {
  return (
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    id.toString().includes(searchQuery.toLowerCase())
  );
}

export function checkAgainstSearchLocation(name, searchQuery) {
  return name.toLowerCase().includes(searchQuery.toLowerCase());
}

export function doSort(sortType, pokemonData) {
  let newList = pokemonData.speciesList.map((data) => data);
  switch (sortType) {
    case "pokedex-asc": {
      newList = sortPokedexAsc(newList);
      break;
    }
    case "pokedex-dsc": {
      newList = sortPokedexDsc(newList);
      break;
    }
    case "alphabet-asc": {
      newList = sortNameAsc(newList);
      break;
    }
    case "alphabet-dsc": {
      newList = sortNameDsc(newList);
      break;
    }
    default: {
      newList = sortPokedexAsc(newList);
      break;
    }
  }
  return newList;
}

export function doSortLocation(sortType, regionData) {
  let newList = regionData.map((data) => data);
  switch (sortType) {
    case "alphabet-asc": {
      newList = sortNameAsc(newList);
      break;
    }
    case "alphabet-dsc": {
      newList = sortNameDsc(newList);
      break;
    }
    default: {
      newList = sortNameAsc(newList);
      break;
    }
  }
  return newList;
}

export async function pokemonToSpecies(url, setSpecies) {
  const response = await fetch(url);
  const data = await response.json();
  setSpecies(data.species.url);
}

export const romanList = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
  "xi",
  "xii",
  "xiii",
  "xiv",
  "xv",
  "xvi",
  "xvii",
  "xviii",
  "xix",
  "xx",
];
