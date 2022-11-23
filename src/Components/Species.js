import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";
import { cleanName } from "../Assets/cleanup";
import PokeballImg from "../Assets/Images/Pokeball.png";
import { LoadingImg } from "../Assets/cleanup";
import crosshair from "../Assets/Images/Crosshair/crosshair";
import config from "../config";
import { EvolutionChain } from "../Assets/Species/EvolutionChain";
import FlavorText from "../Assets/Species/FlavorText";
import Forms from "../Assets/Species/Forms";
import Stats from "../Assets/Species/Stats";
import Abilities from "../Assets/Species/Abilities";
import Encounters from "../Assets/Species/Encounters";
import Moves from "../Assets/Species/Moves";
import AttrTable from "../Assets/Species/AttrTable";
import { LoadingImgLarge } from "../Assets/cleanup";

export default function Species(props) {
  const [speciesData, setSpeciesData] = useState();
  const [pokemonData, setPokemonData] = useState();
  const [formSelected, setFormSelected] = useState(0);
  //props.selectForm is the url to specific pokemon
  const [formFromPokedex, setformFromPokedex] = useState(props.selectForm);
  const [LoadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    const getSpeciesData = async () => {
      const response = await fetch(props.data);
      const data = await response.json();
      setSpeciesData(data);

      const response2 = await fetch(data.varieties[formSelected].pokemon.url);
      const data2 = await response2.json();
      setPokemonData(data2);
    };
    getSpeciesData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getPokemonData = async () => {
      const response = await fetch(
        speciesData.varieties[formSelected].pokemon.url
      );
      const data = await response.json();
      setPokemonData(data);
    };

    if (speciesData) {
      getPokemonData();
    }
    // eslint-disable-next-line
  }, [formSelected, speciesData]);

  useEffect(() => {
    function preselectedForm() {
      speciesData.varieties.forEach((data, index) => {
        if (data.pokemon.url === formFromPokedex) {
          setFormSelected(index);
        }
      });
      setformFromPokedex();
    }

    if (speciesData && formFromPokedex) {
      preselectedForm();
    }
    // eslint-disable-next-line
  }, [speciesData]);

  //Add URLS: color, egg groups, generation, habitat, shape, varieties

  function RenderSpecies() {
    return (
      <>
        <BackButton back={"fromSpecies"} />
        <div className="showcaseContainer">
          <div className="showcase">
            <Forms
              data={speciesData.varieties}
              formSelected={formSelected}
              setFormSelected={setFormSelected}
              defaultName={speciesData.name}
              selectForm={props.selectForm}
            />
          </div>
          <div className="showcase">
            <h1 style={{ fontSize: "3.5em", marginTop: "0" }}>
              {cleanName(speciesData.name)}
            </h1>
            <div className="showcaseImage">
              <img
                className="crosshair1"
                src={crosshair.crosshair1}
                alt="crosshair"
              />
              <img
                className="crosshair2"
                src={crosshair.crosshair2}
                alt="crosshair"
              />
              <img
                className="crosshair3"
                src={crosshair.crosshair3}
                alt="crosshair"
              />
              <img
                className="crosshair4"
                src={crosshair.crosshair4}
                alt="crosshair"
              />
              {LoadingImage ? "" : <LoadingImg />}
              <img
                src={config.ARTWORK + pokemonData.id + ".png"}
                alt={speciesData.name}
                onError={(event) => (event.target.src = PokeballImg)}
                onLoad={setLoadingImage(true)}
              />
            </div>
          </div>
          <div className="showcase">
            <Stats data={pokemonData.stats} />
          </div>
        </div>
        <div className="speciesContainer">
          <AttrTable pokemonData={pokemonData} speciesData={speciesData} />
          <div>
            <h1>Evolution Chain</h1>
            {
              <EvolutionChain
                data={speciesData.evolution_chain}
                pokeid={speciesData.id}
                setSpeciesData={setSpeciesData}
                setFormSelected={setFormSelected}
              />
            }
          </div>
          <Abilities data={pokemonData.abilities} />
          <Moves data={pokemonData.moves} />
          <Encounters data={pokemonData.location_area_encounters} />
          <FlavorText data={speciesData.flavor_text_entries} />
        </div>
      </>
    );
  }

  return <div>{pokemonData ? <RenderSpecies /> : <LoadingImgLarge />}</div>;
}
