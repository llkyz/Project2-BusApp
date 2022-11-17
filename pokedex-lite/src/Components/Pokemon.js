import React, { useState, useEffect } from "react";

export default function Pokemon(props) {
  const [pokemonData, setPokemonData] = useState("");

  useEffect(() => {
    const getPokemonData = async () => {
      const response = await fetch(props.url);
      const data = await response.json();
      setPokemonData(data);
    };
    getPokemonData();
  }, [props.url]);

  return (
    <div>
      <p>Name: {pokemonData.name}</p>
      <p>Habitat: {pokemonData.habitat.name}</p>
    </div>
  );
}
