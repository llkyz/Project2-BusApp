import React from "react";
import { replaceImage } from "../Assets/sortPokemon";

export default function SpeciesEntry(props) {
  return (
    <div
      className="pokemon"
      onClick={() => {
        props.setSpecies(props.data.url);
        window.scrollTo(0, 0);
      }}
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
