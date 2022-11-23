import React from "react";
import { useNavigate } from "react-router";
import { replaceImage } from "../Assets/sortPokemon";

export default function SpeciesEntry(props) {
  const navigate = useNavigate();

  function catchType() {
    if (props.extended) {
      const getSpecies = async () => {
        const response = await fetch(props.data.url);
        let data = await response.json();
        let pokeid = data.species.url.split("/").slice(-2, -1);
        navigate(`/pokemon/${pokeid}`, { state: props.data.url });
      };
      getSpecies();
    } else {
      navigate(`/pokemon/${props.data.pokeid}`);
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
