import React, { useContext } from "react";
import SpeciesEntry from "./SpeciesEntry";
import { Navigation } from "../App";

export default function MakeRegularList() {
  const nav = useContext(Navigation);

  function MakePokeListSprite(myList) {
    return myList.map((data, index) => {
      return <SpeciesEntry key={index} data={data} />;
    });
  }

  return MakePokeListSprite(nav.data.speciesList);
}
