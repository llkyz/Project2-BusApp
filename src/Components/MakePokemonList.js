import React from "react";
import { checkAgainstSearch } from "../Assets/sortPokemon";
import SpeciesEntry from "./SpeciesEntry";

export default function MakePokemonList(props) {
  function MakePokeListSprite(myList) {
    return myList.map((data, index) => {
      return (
        <SpeciesEntry
          key={index}
          data={data}
          sprite={props.pokemonData.sprite}
          setSpecies={props.setSpecies}
          extended={props.extended}
          setSelectForm={props.setSelectForm}
        />
      );
    });
  }
  if (props.searchCheck) {
    let myList = props.pokemonData.speciesList.filter((data) =>
      checkAgainstSearch(data.name, data.pokeid, props.searchBar.searchQuery)
    );
    return MakePokeListSprite(myList);
  } else {
    return MakePokeListSprite(props.pokemonData.speciesList);
  }
}
