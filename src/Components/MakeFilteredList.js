import React from "react";
import { checkAgainstSearch } from "../Assets/sortPokemon";

export default function MakeFilteredList(props) {
  function MakePokeList(myList, setPokemon) {
    return myList.map((data, index) => {
      return (
        <div
          className="pokedex"
          key={index}
          onClick={() => setPokemon(data.url)}
        >
          <div>
            #{data.pokeid}
            <br />
            {data.name}
          </div>
        </div>
      );
    });
  }

  let myList = props.list.filter((data) =>
    checkAgainstSearch(data.name, data.pokeid, props.searchQuery)
  );
  return MakePokeList(myList, props.setPokemon);
}
