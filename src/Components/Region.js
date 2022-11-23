import React, { useState, useEffect } from "react";
import regionImg from "../Assets/Regions/regionImg";
import { Link, useParams } from "react-router-dom";
import Location from "./Location";
import { cleanTitle } from "../Assets/cleanup";
import { LoadingImgLarge } from "../Assets/cleanup";
import config from "../config";

export default function Region() {
  const params = useParams();
  const [regionData, setRegionData] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    const getRegion = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_REGION + params.id
      );
      let data = await response.json();
      setRegionData(data);
    };

    getRegion();
    // eslint-disable-next-line
  }, []);

  function ListLocations() {
    return regionData.locations.map((data, index) => {
      return (
        <div
          key={index}
          className="locationEntry"
          onClick={() => setLocation(data.url)}
        >
          {cleanTitle(data.name)}
        </div>
      );
    });
  }

  function GenerationLink() {
    return (
      <Link
        to="/pokedex/generation"
        state={{
          source: regionData.main_generation.url,
          title:
            "Browsing Generation " +
            regionData.main_generation.name.split("-")[1].toUpperCase(),
          id: regionData.main_generation.name,
        }}
      >
        <h2>
          {regionData.main_generation.name.replace("-", " ").toUpperCase()}
        </h2>
      </Link>
    );
  }

  function DisplayRegion() {
    return (
      <div className="region">
        <div className="regionHeader">
          <h1>{regionData.name.toUpperCase()}</h1>
          {regionData.main_generation ? (
            <GenerationLink />
          ) : (
            <h2>NO GENERATION</h2>
          )}
        </div>
        <img
          className="regionImg"
          src={regionImg[regionData.name]}
          alt={regionData.name}
        />
        {regionData.locations.length !== 0 ? (
          <>
            <h1>Locations</h1>
            <div className="locationList">
              {location ? (
                <Location data={location} reset={setLocation} />
              ) : (
                <ListLocations />
              )}
            </div>
          </>
        ) : (
          <h1>No Locations Found</h1>
        )}
      </div>
    );
  }

  return <div>{regionData ? <DisplayRegion /> : <LoadingImgLarge />}</div>;
}
