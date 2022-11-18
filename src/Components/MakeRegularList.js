import React from "react";

export default function MakeRegularList(props) {
  function MakePokeList(myList, setPokemon) {
    return myList.map((data, index) => {
      return (
        <div
          className="pokedex"
          key={index}
          onClick={() => setPokemon(data.url)}
        >
          <div>
            #{data.pokeid}
            <br />
            {data.name}
          </div>
        </div>
      );
    });
  }

  return MakePokeList(props.list, props.setPokemon);
}
