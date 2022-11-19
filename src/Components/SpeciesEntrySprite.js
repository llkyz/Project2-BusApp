import React from "react";

export default function SpeciesEntrySprite(props) {
  return (
    <div
      className="pokemon"
      key={props.index}
      onClick={() => {
        props.setPokemon("species", props.data.url);
        window.scrollTo(0, 0);
      }}
    >
      <div className="pokemonImageContainer">
        <img
          src={props.sprite + props.data.pokeid + ".png"}
          alt={props.data.name}
          onError={(event) => props.replaceImage(event)}
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
