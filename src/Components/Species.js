import React, { useEffect, useContext } from "react";
import { Navigation } from "../App";
import BackButton from "./BackButton";
import { cleanName } from "../Assets/cleanup";
import config from "../config";
import { EvolutionChain } from "../Assets/Species/EvolutionChain";
import pokemonColors from "../Assets/pokemonColors";
import FlavorText from "../Assets/Species/FlavorText";
import Genus from "../Assets/Species/Genus";

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

//Add URLS: color, egg groups, generation, habitat, shape, varieties

// Gender Rate
// -1: Genderless
// 0: M only
// 1: 1F:7M
// 2: 1F:3M
// 3: N/A
// 4: 1F:1M
// 5: N/A
// 6: 3F:1M
// 7: 7F:1M
// 8: F only

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
          <div>
            Evolution Chain:{" "}
            {<EvolutionChain data={nav.data.speciesData.evolution_chain} />}
          </div>
          <FlavorText data={nav.data.speciesData.flavor_text_entries} />
          <p>Egg Hatching: ~{nav.data.speciesData.hatch_counter*256} steps</p>
          <Genus data={nav.data.speciesData.genera}/>
          <p>Pokedex ID: {nav.data.speciesData.id}</p>
          <p>Growth: {nav.data.speciesData.growth_rate.name.split("-").map((speed)=> speed[0].toUpperCase() + speed.substring(1, speed.length)).join(" - ")}</p>
          
          <p>Egg Groups: {JSON.stringify(nav.data.speciesData.egg_groups)}</p>
          <p>
            Form Descriptions:{" "}
            {JSON.stringify(nav.data.speciesData.form_descriptions)}
          </p>
          <p>Form Switchable: {nav.data.speciesData.forms_switchable}</p>
          <p>Gender Rate: {nav.data.speciesData.gender_rate}</p>
          <p>Generation: {JSON.stringify(nav.data.speciesData.generation)}</p>
          <p>Habitat: {JSON.stringify(nav.data.speciesData.habitat)}</p>
          <p>
            Has Gender Differences:{" "}
            {nav.data.speciesData.has_gender_differences ? "Yes" : "No"}
          </p>
          <p>Is Baby: {nav.data.speciesData.is_baby ? "Yes" : "No"}</p>
          <p>Is Legendary: {nav.data.speciesData.is_legendary ? "Yes" : "No"}</p>
          <p>Is Mythical: {nav.data.speciesData.is_mythical ? "Yes" : "No"}</p>
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
