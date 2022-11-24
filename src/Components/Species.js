import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { cleanName } from "../Assets/cleanup";
import Star from "../Assets/Species/Star.js";
import PokeballImg from "../Assets/Images/Pokeball.png";
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
import FavouritesSpecies from "./FavouritesSpecies";

export default function Species() {
  const params = useParams();
  const location = useLocation();

  const [speciesData, setSpeciesData] = useState();
  const [pokemonData, setPokemonData] = useState();
  const [formSelected, setFormSelected] = useState(0);
  const [formFromPokedex, setformFromPokedex] = useState(location.state);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favourites, setFavourites] = useState();

  function onLoad() {
    setImageLoaded(true);
  }

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites"));
    if (storedFavs) {
      setFavourites(storedFavs);
    }
  }, []);

  useEffect(() => {
    const getSpeciesData = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_SPECIES + params.id
      );
      const data = await response.json();
      setSpeciesData(data);
      let myIndex = 0;
      if (formFromPokedex !== null) {
        data.varieties.forEach((data, index) => {
          if (data.pokemon.url === formFromPokedex) {
            setFormSelected(index);
            myIndex = index;
          }
        });
        setformFromPokedex();
      }

      const response2 = await fetch(data.varieties[myIndex].pokemon.url);
      const data2 = await response2.json();
      setPokemonData(data2);
    };
    getSpeciesData();
    // eslint-disable-next-line
  }, [params]);

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

  // useEffect(() => {
  //   function resetForm() {
  //     setFormSelected(0);
  //   }
  //   resetForm();
  // }, [speciesData]);

  return (
    <div>
      {favourites ? (
        <FavouritesSpecies
          favourites={favourites}
          setFavourites={setFavourites}
        />
      ) : (
        ""
      )}
      <div className="showcaseContainer">
        {pokemonData ? (
          <div className="showcase">
            <Forms
              data={speciesData.varieties}
              formSelected={formSelected}
              setFormSelected={setFormSelected}
              defaultName={speciesData.name}
              selectForm={location.state}
            />
          </div>
        ) : (
          ""
        )}
        <div className="showcase">
          {pokemonData ? (
            <h1
              style={{
                fontSize: "3.5em",
                marginTop: "0",
                marginRight: "20px",
                marginBottom: "0",
                display: "inline-block",
              }}
            >
              {cleanName(speciesData.name)}
            </h1>
          ) : (
            ""
          )}
          {pokemonData ? (
            <Star
              pokeid={speciesData.id}
              name={cleanName(speciesData.name)}
              favourites={favourites}
              setFavourites={setFavourites}
            />
          ) : (
            ""
          )}
          {pokemonData ? (
            <div className="showcaseImage">
              <img
                className="crosshair1"
                src={crosshair.crosshair1}
                alt="crosshair"
                style={{ display: imageLoaded ? "block" : "none" }}
              />
              <img
                className="crosshair2"
                src={crosshair.crosshair2}
                alt="crosshair"
                style={{ display: imageLoaded ? "block" : "none" }}
              />
              <img
                className="crosshair3"
                src={crosshair.crosshair3}
                alt="crosshair"
                style={{ display: imageLoaded ? "block" : "none" }}
              />
              <img
                className="crosshair4"
                src={crosshair.crosshair4}
                alt="crosshair"
                style={{ display: imageLoaded ? "block" : "none" }}
              />
              <img
                className="loadingImgPokemon"
                src={PokeballImg}
                alt="loading"
                style={{
                  width: "300px",
                  display: imageLoaded ? "none" : "block",
                }}
              />
              <img
                src={config.ARTWORK + pokemonData.id + ".png"}
                alt={speciesData.name}
                onError={(event) => (event.target.src = PokeballImg)}
                onLoad={onLoad}
                style={{ display: imageLoaded ? "block" : "none" }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {pokemonData ? (
          <div className="showcase">
            <Stats data={pokemonData.stats} />
          </div>
        ) : (
          ""
        )}
      </div>
      {pokemonData ? (
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
      ) : (
        <LoadingImgLarge />
      )}
    </div>
  );
}
