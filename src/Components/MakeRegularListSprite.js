import React from "react";
import { replaceImage } from "../Assets/sortPokemon";

export default function MakeRegularListSprite(props) {
  function MakePokeListSprite(myList, setPokemon, sprite) {
    return myList.map((data, index) => {
      return (
        <div
          className="pokemon"
          key={index}
          onClick={() => setPokemon(data.url)}
        >
          <div className="pokemonImageContainer">
            <img
              src={sprite + data.pokeid + ".png"}
              alt={data.name}
              onError={(event) => replaceImage(event)}
            />
          </div>
          <div>
            #{data.pokeid}
            <br />
            {data.name}
          </div>
        </div>
      );
    });
  }

  return MakePokeListSprite(props.list, props.setPokemon, props.sprite);
}
