import React from "react";
import { checkAgainstSearch } from "../Assets/sortPokemon";
import SpeciesEntry from "./SpeciesEntry";

export default function MakeFilteredList(props) {
  function MakePokeList(myList, setPokemon) {
    return myList.map((data, index) => {
      return <SpeciesEntry index={index} data={data} setPokemon={setPokemon} />;
    });
  }

  let myList = props.list.filter((data) =>
    checkAgainstSearch(data.name, data.pokeid, props.searchQuery)
  );
  return MakePokeList(myList, props.setPokemon);
}
