import React, { useState, useEffect } from "react";
import config from "../config";
import generationImg from "../Assets/Generations/generationImg";
// import generationSprites from "../Assets/generationSprites";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import { LoadingImgLarge } from "../Assets/cleanup";

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
        to="/pokedex/generation"
        state={{
          source: generationList.results[index].url,
          title: "Browsing Generation " + data.name.split("-")[1].toUpperCase(),
          id: data.name,
        }}
      >
        <div
          className="generation"
          id={
            "gen" + data.url.substring(data.url.length - 2, data.url.length - 1)
          }
        >
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
      {generationList ? (
        <>
          <Link to="/">
            <BackButton back={"fromGenerationList"} />
          </Link>
          <div className="generationDiv">
            <h1>
              <u>Search by Generation</u>
            </h1>
            <ListGenerations />
          </div>
        </>
      ) : (
        <LoadingImgLarge />
      )}
    </>
  );
}
