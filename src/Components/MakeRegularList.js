import React from "react";
import SpeciesEntry from "./SpeciesEntry";

export default function MakeRegularList(props) {
  function MakePokeList(myList, setPokemon) {
    return myList.map((data, index) => {
      return <SpeciesEntry index={index} data={data} setPokemon={setPokemon} />;
    });
  }

  return MakePokeList(props.list, props.setPokemon);
}
