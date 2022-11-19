import React, { useContext } from "react";
import { Navigation } from "../App";

export default function BackButton(props) {
  const nav = useContext(Navigation);

  function fromPokeList() {
    nav.set("generation", "");
    window.scrollTo(0, 0);
  }

  function fromPokedex() {
    nav.set("searchQueryPokemon", "");
    nav.set("speciesList", "");
    window.scrollTo(0, 0);
  }

  function fromSpecies() {
    nav.set("speciesData", "");
    nav.set("species", "");
    window.scrollTo(0, 0);
  }

  function fromGenerationList() {
    nav.set("generationList", "");
    window.scrollTo(0, 0);
  }

  function fromRegionList() {
    nav.set("regionList", "");
    window.scrollTo(0, 0);
  }

  const backFunctions = {
    fromPokeList: fromPokeList,
    fromPokedex: fromPokedex,
    fromSpecies: fromSpecies,
    fromGenerationList: fromGenerationList,
    fromRegionList: fromRegionList,
  };

  return (
    <h2 className="back" onClick={backFunctions[props.back]}>
      ← BACK
    </h2>
  );
}
