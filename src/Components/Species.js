import React, { useEffect, useContext } from "react";
import { Navigation } from "../App";
import BackButton from "./BackButton";

export default function Species(props) {
  const nav = useContext(Navigation);

  const artwork =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  useEffect(() => {
    const getSpeciesData = async () => {
      const response = await fetch(props.url);
      const data = await response.json();
      nav.set({ speciesData: data });
    };
    getSpeciesData();
    // eslint-disable-next-line
  }, []);

  const pokeid = props.url.split("/").slice(-2, -1);

  function RenderSpecies() {
    return (
      <>
        <BackButton back={"fromSpecies"} />
        <div className="speciesContainer">
          <h1>
            {nav.data.speciesData.name[0].toUpperCase() +
              nav.data.speciesData.name.substring(
                1,
                nav.data.speciesData.name.length
              )}
          </h1>
          <img
            src={artwork + pokeid + ".png"}
            alt={nav.data.speciesData.name}
          />
          <p>Base Happiness: {nav.data.speciesData.base_happiness}</p>
          <p>Capture Rate: {nav.data.speciesData.capture_rate}</p>
          <p>Color: {JSON.stringify(nav.data.speciesData.color)}</p>
          <p>Egg Groups: {JSON.stringify(nav.data.speciesData.egg_groups)}</p>
          <p>
            Evolution Chain:{" "}
            {JSON.stringify(nav.data.speciesData.evolution_chain)}
          </p>
          <p>
            Evolves from Species:{" "}
            {JSON.stringify(nav.data.speciesData.evolves_from_species)}
          </p>
          <p>
            Flavor Text Entries:{" "}
            {JSON.stringify(nav.data.speciesData.flavor_text_entries)}
          </p>
          <p>Form Descriptions: {nav.data.speciesData.form_descriptions}</p>
          <p>Form Switchable: {nav.data.speciesData.forms_switchable}</p>
          <p>Gender Rate: {nav.data.speciesData.gender_rate}</p>
          <p>Genera: {JSON.stringify(nav.data.speciesData.genera)}</p>
          <p>Generation: {JSON.stringify(nav.data.speciesData.generation)}</p>
          <p>Growth Rate: {JSON.stringify(nav.data.speciesData.growth_rate)}</p>
          <p>Habitat: {JSON.stringify(nav.data.speciesData.habitat)}</p>
          <p>
            Has Gender Differences:{" "}
            {nav.data.speciesData.has_gender_differences}
          </p>
          <p>Hatch Counter: {nav.data.speciesData.hatch_counter}</p>
          <p>ID: {nav.data.speciesData.id}</p>
          <p>Is Baby: {nav.data.speciesData.is_baby}</p>
          <p>Is Legendary: {nav.data.speciesData.is_legendary}</p>
          <p>Is Mythical: {nav.data.speciesData.is_mythical}</p>
          <p>Names: {JSON.stringify(nav.data.speciesData.names)}</p>
          <p>Order: {nav.data.speciesData.order}</p>
          <p>
            Pal Park Encounters:{" "}
            {JSON.stringify(nav.data.speciesData.pal_park_encounters)}
          </p>
          <p>
            Pokedex Numbers:{" "}
            {JSON.stringify(nav.data.speciesData.pokedex_numbers)}
          </p>
          <p>Shape: {JSON.stringify(nav.data.speciesData.shape)}</p>
          <p>Varieties: {JSON.stringify(nav.data.speciesData.varieties)}</p>
        </div>
      </>
    );
  }

  return (
    <div>
      {nav.data.speciesData ? (
        <RenderSpecies />
      ) : (
        "Loading Species, please wait..."
      )}
    </div>
  );
}
