import React, { useState, useEffect } from "react";
import config from "../config";
import generationImg from "../Assets/Generations/generationImg";
import { Link } from "react-router-dom";
import { LoadingImgLarge } from "../Assets/cleanup";
import Favourites from "./Favourites";

export default function Generation() {
  const [generationList, setGenerationList] = useState("");

  useEffect(() => {
    const getGeneration = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_GENERATION
      );
      const data = await response.json();
      setGenerationList(data);
    };
    getGeneration();
    // eslint-disable-next-line
  }, []);

  function ListGenerations() {
    return generationList.results.map((data, index) => (
      <Link
        key={index}
        to={`/pokedex/generation/${data.url.substring(
          data.url.length - 2,
          data.url.length - 1
        )}`}
      >
        <div className="generation">
          <p>{data.name.replace("-", " ").toUpperCase()}</p>
          <div className="imageContainer">
            <img src={generationImg[data.name]} alt={data.name} />
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <>
      <Favourites />
      {generationList ? (
        <div className="generationDiv">
          <h1>
            <u>Search by Generation</u>
          </h1>
          <ListGenerations />
        </div>
      ) : (
        <LoadingImgLarge />
      )}
    </>
  );
}
