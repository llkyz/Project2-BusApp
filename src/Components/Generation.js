import React, { useState, useEffect } from "react";
import config from "../config";
import generationImg from "../Assets/generationImg";
import generationSprites from "../Assets/generationSprites";
import PokeList from "./PokeList";

export default function Generation() {
  const [generationData, setGenerationData] = useState("");
  const [generation, setGeneration] = useState("");

  useEffect(() => {
    const getGeneration = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_GENERATION
      );
      const data = await response.json();
      setGenerationData(data);
    };
    getGeneration();
  }, []);

  function selectGeneration(index, dataName) {
    setGeneration({
      url: generationData.results[index].url,
      sprite: generationSprites[dataName],
    });
  }

  function ListGenerations() {
    return generationData.results.map((data, index) => (
      <div
        onClick={() => selectGeneration(index, data.name)}
        className="generation"
        id={
          "gen" + data.url.substring(data.url.length - 2, data.url.length - 1)
        }
        key={index}
      >
        <p>{data.name.replace("-", " ").toUpperCase()}</p>
        <div className="imageContainer">
          <img src={generationImg[data.name]} alt={data.name} />
        </div>
      </div>
    ));
  }

  return (
    <div className="generationDiv">
      <div>
        {generationData ? (
          generation ? (
            <PokeList url={generation.url} sprite={generation.sprite} />
          ) : (
            <>
              <h1>
                <u>Search by generation</u>
              </h1>
              <ListGenerations />
            </>
          )
        ) : (
          "Loading, please wait..."
        )}
      </div>
    </div>
  );
}
