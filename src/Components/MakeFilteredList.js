import React, { useContext } from "react";
import { checkAgainstSearch } from "../Assets/sortPokemon";
import SpeciesEntry from "./SpeciesEntry";
import { Navigation } from "../App";

export default function MakeFilteredList() {
  const nav = useContext(Navigation);

  function MakePokeListSprite(myList) {
    return myList.map((data, index) => {
      return <SpeciesEntry key={index} data={data} />;
    });
  }
  let myList = nav.data.speciesList.filter((data) =>
    checkAgainstSearch(data.name, data.pokeid, nav.data.searchQueryPokemon)
  );
  return MakePokeListSprite(myList);
}
