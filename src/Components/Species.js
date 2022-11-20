import React, { useEffect, useContext } from "react";
import { Navigation } from "../App";
import BackButton from "./BackButton";
import { cleanName } from "../Assets/cleanup";
import config from "../config";
import { EvolutionChain } from "../Assets/speciesFunctions";
import pokemonColors from "../Assets/pokemonColors";

export default function Species() {
  const nav = useContext(Navigation);

  useEffect(() => {
    const getSpeciesData = async () => {
      const response = await fetch(nav.data.species);
      const data = await response.json();
      nav.set({ speciesData: data });
    };
    getSpeciesData();
    // eslint-disable-next-line
  }, []);

  const pokeid = nav.data.species.split("/").slice(-2, -1);

  function RenderSpecies() {
    return (
      <>
        <BackButton back={"fromSpecies"} />
        <div className="speciesContainer">
          <h1>{cleanName(nav.data.speciesData.name)}</h1>
          <img
            src={config.ARTWORK + pokeid + ".png"}
            alt={nav.data.speciesData.name}
          />
          <p>Base Happiness: {nav.data.speciesData.base_happiness}</p>
          <p>Capture Rate: {nav.data.speciesData.capture_rate}</p>
          <p>Color:</p>
          <div
            className="pokemonColor"
            style={pokemonColors[nav.data.speciesData.color.name]}
          >
            {nav.data.speciesData.color.name.toUpperCase()}
          </div>
          <p>Egg Groups: {JSON.stringify(nav.data.speciesData.egg_groups)}</p>
          <div>
            Evolution Chain:{" "}
            {<EvolutionChain data={nav.data.speciesData.evolution_chain} />}
          </div>
          <p>
            Flavor Text Entries:{" "}
            {JSON.stringify(nav.data.speciesData.flavor_text_entries)}
          </p>
          <p>
            Form Descriptions:{" "}
            {JSON.stringify(nav.data.speciesData.form_descriptions)}
          </p>
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
