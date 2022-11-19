import React, { useContext } from "react";
import { Navigation } from "../App";
import { replaceImage } from "../Assets/sortPokemon";

export default function SpeciesEntry(props) {
  const nav = useContext(Navigation);

  return (
    <div
      className="pokemon"
      onClick={() => {
        nav.set({ species: props.data.url });
        window.scrollTo(0, 0);
      }}
    >
      <div className="pokemonImageContainer">
        <img
          src={nav.data.generation.sprite + props.data.pokeid + ".png"}
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
