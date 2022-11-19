import React from "react";
import { replaceImage } from "../Assets/sortPokemon";
import { checkAgainstSearch } from "../Assets/sortPokemon";
import SpeciesEntrySprite from "./SpeciesEntrySprite";

export default function MakeFilteredListSprite(props) {
  function MakePokeListSprite(myList, setPokemon, sprite) {
    return myList.map((data, index) => {
      return (
        <SpeciesEntrySprite
          index={index}
          data={data}
          setPokemon={setPokemon}
          sprite={sprite}
          replaceImage={replaceImage}
        />
      );
    });
  }
  let myList = props.list.filter((data) =>
    checkAgainstSearch(data.name, data.pokeid, props.searchQuery)
  );
  return MakePokeListSprite(myList, props.setPokemon, props.sprite);
}
