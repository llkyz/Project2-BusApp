import React from "react";
import { replaceImage } from "../Assets/sortPokemon";

export default function SpeciesEntry(props) {
  function catchType() {
    if (props.extended) {
      const getSpecies = async () => {
        const response = await fetch(props.data.url);
        let data = await response.json();
        props.setSpecies(data.species.url);
        props.setSelectForm(props.data.url);
        window.scrollTo(0, 0);
      };
      getSpecies();
    } else {
      props.setSpecies(props.data.url);
      window.scrollTo(0, 0);
    }
  }

  return (
    <div
      className={props.extended ? "pokemon extended" : "pokemon"}
      onClick={catchType}
    >
      <div className="pokemonImageContainer">
        <img
          src={props.sprite + props.data.pokeid + ".png"}
          alt={props.data.name}
          onError={(event) => replaceImage(event)}
        />
      </div>
      <div>
        #{props.data.pokeid}
        <br />
        {props.data.name}
      </div>
    </div>
  );
}
