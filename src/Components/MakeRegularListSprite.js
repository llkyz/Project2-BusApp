import React from "react";
import { replaceImage } from "../Assets/sortPokemon";
import SpeciesEntrySprite from "./SpeciesEntrySprite";

export default function MakeRegularListSprite(props) {
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

  return MakePokeListSprite(props.list, props.setPokemon, props.sprite);
}
