import React from "react";

export default function SpeciesEntry(props) {
  return (
    <div
      className="pokedex"
      key={props.index}
      onClick={() => {
        props.setPokemon("species", props.data.url);
        window.scrollTo(0, 0);
      }}
    >
      <div>
        #{props.data.pokeid}
        <br />
        {props.data.name}
      </div>
    </div>
  );
}
