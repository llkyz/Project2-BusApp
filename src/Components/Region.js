import React, { useEffect, useContext } from "react";
import { Navigation } from "../App";
import BackButton from "./BackButton";
import regionImg from "../Assets/regionImg";
import { Link } from "react-router-dom";
import generationSprites from "../Assets/generationSprites";
import config from "../config";
import Location from "./Location";
import { cleanTitle } from "../Assets/cleanup";
import Species from "./Species";

export default function Region() {
  const nav = useContext(Navigation);

  useEffect(() => {
    const getRegion = async () => {
      const response = await fetch(nav.data.region);
      let data = await response.json();
      nav.set({ regionData: data });
    };

    getRegion();
    // eslint-disable-next-line
  }, []);

  function goToGeneration() {
    let generationNum = nav.data.region.split("/");
    generationNum = generationNum[generationNum.length - 2];
    let generationData = {
      name: nav.data.regionData.main_generation.name,
      sprite: generationSprites[nav.data.regionData.main_generation.name],
      url: config.BASE_API_DOMAIN + config.ENDPOINT_GENERATION + generationNum,
    };
    nav.set({
      region: "",
      regionData: "",
      regionList: "",
      generation: generationData,
    });
  }

  function ListLocations() {
    return nav.data.regionData.locations.map((data, index) => {
      return (
        <div
          key={index}
          className="locationEntry"
          onClick={() => nav.set({ location: data.url })}
        >
          {cleanTitle(data.name)}
        </div>
      );
    });
  }

  function GenerationLink() {
    return (
      <Link to="/generation">
        <h2 onClick={goToGeneration}>
          {nav.data.regionData.main_generation.name
            .replace("-", " ")
            .toUpperCase()}
        </h2>
      </Link>
    );
  }

  function DisplayRegion() {
    return (
      <>
        <BackButton back={"fromRegion"} />
        <div className="region">
          <div className="regionHeader">
            <h1>{nav.data.regionData.name.toUpperCase()}</h1>
            {nav.data.regionData.main_generation ? (
              <GenerationLink />
            ) : (
              <h2>NO GENERATION</h2>
            )}
          </div>
          <img
            src={regionImg[nav.data.regionData.name]}
            alt={nav.data.regionData.name}
          />
          {nav.data.regionData.locations.length !== 0 ? (
            <>
              <h1>Locations</h1>
              <div className="locationList">
                {nav.data.location ? <Location /> : <ListLocations />}
              </div>
            </>
          ) : (
            <h1>No Locations Found</h1>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {nav.data.species ? (
        <Species />
      ) : (
        <div>
          {nav.data.regionData ? (
            <DisplayRegion />
          ) : (
            "Loading Region, please wait..."
          )}
        </div>
      )}
    </>
  );
}
