import React, { useContext } from "react";
import { Navigation } from "../App";

export default function BackButton(props) {
  const nav = useContext(Navigation);

  function fromPokeList() {
    nav.set({
      searchQueryPokemon: "",
      speciesList: "",
      generation: "",
      sortQueryPokemon: "",
    });
    window.scrollTo(0, 0);
  }

  function fromSpecies() {
    nav.set({ speciesData: "", species: "" });
    window.scrollTo(0, 0);
  }

  function fromGenerationList() {
    nav.set({ generationList: "" });
    window.scrollTo(0, 0);
  }

  function fromRegionList() {
    nav.set({ regionList: "" });
    window.scrollTo(0, 0);
  }

  function fromRegion() {
    nav.set({ region: "", regionData: "", location: "" });
    window.scrollTo(0, 0);
  }

  const backFunctions = {
    fromPokeList: fromPokeList,
    fromSpecies: fromSpecies,
    fromGenerationList: fromGenerationList,
    fromRegionList: fromRegionList,
    fromRegion: fromRegion,
  };

  return (
    <h2 className="back" onClick={backFunctions[props.back]}>
      ← BACK
    </h2>
  );
}
