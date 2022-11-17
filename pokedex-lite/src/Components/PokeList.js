import React, { useState, useEffect } from "react";

export default function PokeList(props) {
  const [pokeData, setPokeData] = useState("");
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
  }, []);

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

  function MakePokeList() {
    return pokeData.map((data, index) => {
      return (
        <div
          className="pokemon"
          key={index}
          onClick={() => setPokemon(data.url)}
        >
          <div className="pokemonImageContainer">
            <img src={props.sprite + data.pokeid + ".png"} />
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

  function sortPokedexAsc(myList) {
    myList.sort((a, b) => {
      let idA = a.pokeid;
      let idB = b.pokeid;
      if (idA < idB) return -1;
      if (idA > idB) return 1;
    });
    return myList;
  }

  function sortPokedexDsc(myList) {
    myList.sort((a, b) => {
      let idA = a.pokeid;
      let idB = b.pokeid;
      if (idA > idB) return -1;
      if (idA < idB) return 1;
    });
    return myList;
  }

  function sortNameAsc(myList) {
    myList.sort((a, b) => {
      let idA = a.name.toLowerCase();
      let idB = b.name.toLowerCase();
      if (idA < idB) return -1;
      if (idA > idB) return 1;
    });
    return myList;
  }

  function sortNameDsc(myList) {
    myList.sort((a, b) => {
      let idA = a.name.toLowerCase();
      let idB = b.name.toLowerCase();
      if (idA > idB) return -1;
      if (idA < idB) return 1;
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
    <div className="generationDiv">
      <h1>
        <u>
          Browsing Generation{" "}
          {props.url.substring(props.url.length - 2, props.url.length - 1)}
        </u>
      </h1>
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
      <div>{pokemon ? "Chose " + pokemon : ""}</div>
      <div className="pokemonContainer">
        {pokeData ? <MakePokeList /> : "Loading, Please wait..."}
      </div>
    </div>
  );
}
