import React, { useEffect, useContext } from "react";
import config from "../config";
import generationImg from "../Assets/generationImg";
import generationSprites from "../Assets/generationSprites";
import PokeList from "./PokeList";
import { Navigation } from "../App";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";

export default function Generation() {
  const nav = useContext(Navigation);

  useEffect(() => {
    const getGeneration = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_GENERATION
      );
      const data = await response.json();
      nav.set("generationList", data);
    };
    getGeneration();
    // eslint-disable-next-line
  }, []);

  function selectGeneration(index, dataName) {
    nav.set("generation", {
      url: nav.data.generationList.results[index].url,
      sprite: generationSprites[dataName],
    });
  }

  function ListGenerations() {
    return nav.data.generationList.results.map((data, index) => (
      <div
        onClick={() => {
          selectGeneration(index, data.name);
          window.scrollTo(0, 0);
        }}
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
    <>
      {nav.data.generationList ? (
        nav.data.generation ? (
          <PokeList />
        ) : (
          <>
            <Link to="/">
              <BackButton back={"fromGenerationList"} />
            </Link>
            <div className="generationDiv">
              <h1>
                <u>Search by generation</u>
              </h1>
              <ListGenerations />
            </div>
          </>
        )
      ) : (
        "Loading Generations, please wait..."
      )}
    </>
  );
}
