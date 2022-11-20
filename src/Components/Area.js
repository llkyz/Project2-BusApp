import React, { useState, useEffect, useContext } from "react";
import { cleanName } from "../Assets/cleanup";
import versions from "../Assets/versions";
import { Navigation } from "../App";
import { pokemonToSpecies } from "../Assets/sortPokemon";

export default function Area(props) {
  const [areaData, setAreaData] = useState("");

  const nav = useContext(Navigation);

  useEffect(() => {
    const getArea = async () => {
      const response = await fetch(props.url);
      let data = await response.json();
      setAreaData(data);
    };

    getArea();
    // eslint-disable-next-line
  }, []);
  function GetVersions(props) {
    return props.data.version_details.map((data2, index) => {
      return (
        <div
          key={index}
          className={["version", versions[data2.version.name].col].join(" ")}
        >
          {versions[data2.version.name].letter}
        </div>
      );
    });
  }

  function GetPokemon() {
    return areaData.pokemon_encounters.map((data, index) => {
      return (
        <div className="areaContainer2" key={index}>
          <h3
            className="versionContainerPokemon"
            onClick={() => {
              console.log(data.pokemon.url);
              pokemonToSpecies(nav, data.pokemon.url);
              window.scrollTo(0, 0);
            }}
          >
            {cleanName(data.pokemon.name)}
          </h3>
          <div className="versionContainer">
            <GetVersions data={data} />
          </div>
        </div>
      );
    });
  }

  return <>{areaData ? <GetPokemon /> : ""}</>;
}
