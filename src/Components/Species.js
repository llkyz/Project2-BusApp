import React, { useState, useEffect } from "react";

export default function Species(props) {
  const [speciesData, setSpeciesData] = useState("");

  const artwork =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  useEffect(() => {
    const getSpeciesData = async () => {
      const response = await fetch(props.url);
      const data = await response.json();
      setSpeciesData(data);
    };
    getSpeciesData();
  }, [props.url]);

  const pokeid = props.url.split("/").slice(-2, -1);

  function RenderSpecies() {
    return (
      <div className="pokemonContainer">
        <h2 className="back" onClick={() => props.back()}>
          ← BACK
        </h2>
        <h1>
          {speciesData.name[0].toUpperCase() +
            speciesData.name.substring(1, speciesData.name.length)}
        </h1>
        <img src={artwork + pokeid + ".png"} alt={speciesData.name} />
        <p>Base Happiness: {speciesData.base_happiness}</p>
        <p>Capture Rate: {speciesData.capture_rate}</p>
        <p>Color: {JSON.stringify(speciesData.color)}</p>
        <p>Egg Groups: {JSON.stringify(speciesData.egg_groups)}</p>
        <p>Evolution Chain: {JSON.stringify(speciesData.evolution_chain)}</p>
        <p>
          Evolves from Species:{" "}
          {JSON.stringify(speciesData.evolves_from_species)}
        </p>
        <p>
          Flavor Text Entries: {JSON.stringify(speciesData.flavor_text_entries)}
        </p>
        <p>Form Descriptions: {speciesData.form_descriptions}</p>
        <p>Form Switchable: {speciesData.forms_switchable}</p>
        <p>Gender Rate: {speciesData.gender_rate}</p>
        <p>Genera: {JSON.stringify(speciesData.genera)}</p>
        <p>Generation: {JSON.stringify(speciesData.generation)}</p>
        <p>Growth Rate: {JSON.stringify(speciesData.growth_rate)}</p>
        <p>Habitat: {JSON.stringify(speciesData.habitat)}</p>
        <p>Has Gender Differences: {speciesData.has_gender_differences}</p>
        <p>Hatch Counter: {speciesData.hatch_counter}</p>
        <p>ID: {speciesData.id}</p>
        <p>Is Baby: {speciesData.is_baby}</p>
        <p>Is Legendary: {speciesData.is_legendary}</p>
        <p>Is Mythical: {speciesData.is_mythical}</p>
        <p>Names: {JSON.stringify(speciesData.names)}</p>
        <p>Order: {speciesData.order}</p>
        <p>
          Pal Park Encounters: {JSON.stringify(speciesData.pal_park_encounters)}
        </p>
        <p>Pokedex Numbers: {JSON.stringify(speciesData.pokedex_numbers)}</p>
        <p>Shape: {JSON.stringify(speciesData.shape)}</p>
        <p>Varieties: {JSON.stringify(speciesData.varieties)}</p>
      </div>
    );
  }

  return <div>{speciesData ? <RenderSpecies /> : ""}</div>;
}
