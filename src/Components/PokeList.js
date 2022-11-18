import React, { useState, useEffect } from "react";
import magnifyingGlass from "../Assets/search.svg";
import Species from "./Species";

export default function PokeList(props) {
  const [pokeData, setPokeData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemon, setPokemon] = useState("");

  useEffect(() => {
    const getPokeList = async () => {
      const response = await fetch(props.url);
      let data = await response.json();
      data = createPokeId(data);
      data = sortPokedexAsc(data);
      setPokeData(data);
    };

    getPokeList();
  }, [props.url]);

  function createPokeId(myData) {
    let myList = [];
    myList = myData.pokemon_species.map((data) => {
      return {
        name:
          data.name[0].toUpperCase() + data.name.substring(1, data.name.length),
        url: data.url,
        pokeid: parseInt(data.url.split("/").slice(-2, -1)),
      };
    });

    return myList;
  }

  function checkAgainstSearch(name, id) {
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      id.toString().includes(searchQuery.toLowerCase())
    );
  }

  function MakeFilteredList() {
    let myList = pokeData.filter((data) =>
      checkAgainstSearch(data.name, data.pokeid)
    );

    return MakePokeList(myList);
  }

  function MakeRegularList(props) {
    return MakePokeList(props.list);
  }

  function MakePokeList(myList) {
    return myList.map((data, index) => {
      return (
        <div
          className="pokemon"
          key={index}
          onClick={() => setPokemon(data.url)}
        >
          <div className="pokemonImageContainer">
            <img
              src={props.sprite + data.pokeid + ".png"}
              alt={data.name}
              onError={(event) => replaceImage(event)}
            />
          </div>
          <div>
            #{data.pokeid}
            <br />
            {data.name}
          </div>
        </div>
      );
    });
  }

  function replaceImage(event) {
    event.target.src =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
  }

  function sortPokedexAsc(myList) {
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

  function sortNameAsc(myList) {
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
          <div>{pokemon ? "Chose " + pokemon : ""}</div>
          <div className="pokemonContainer">
            <div className="searchBar">
              <div style={{ width: "50%", display: "flex" }}>
                <img src={magnifyingGlass} id="magnifyingGlass" alt="search" />
                <label id="search">
                  <input
                    type="text"
                    placeholder="Search"
                    id="searchInput"
                    spellCheck="false"
                    autoComplete="off"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.currentTarget.value)
                    }
                  />
                </label>
              </div>
              <div className="sorting">
                <label htmlFor="sorting">Sort by:</label>
                <select
                  name="sorting"
                  id="sort"
                  onChange={(event) => doSort(event.target.value)}
                >
                  <option value="pokedex-asc" defaultValue>
                    Pokédex # Ascending
                  </option>
                  <option value="pokedex-dsc">Pokédex # Descending</option>
                  <option value="alphabet-asc">Alphabetical Ascending</option>
                  <option value="alphabet-dsc">Alphabetical Descending</option>
                </select>
              </div>
            </div>
            {pokeData ? (
              searchQuery ? (
                <MakeFilteredList />
              ) : (
                <MakeRegularList list={pokeData} />
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
