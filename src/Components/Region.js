import React, { useState, useEffect } from "react";
import config from "../config";
import regionImg from "../Assets/regionImg";
import Location from "./Location";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";

export default function Region() {
  const [regionData, setRegionData] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const getRegions = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_REGION
      );
      let data = await response.json();
      setRegionData(data.results);
    };

    getRegions();
  }, []);

  function ListRegions() {
    return regionData.map((data, index) => (
      <div
        onClick={() => setRegion(data.url)}
        className="regionContainer"
        id={
          "region" +
          data.url.substring(data.url.length - 2, data.url.length - 1)
        }
        key={index}
      >
        <h1>{data.name.toUpperCase()}</h1>
        <div className="imageContainer">
          <img src={regionImg[data.name]} alt={data.name} />
        </div>
      </div>
    ));
  }

  return (
    <>
      {regionData ? (
        region ? (
          <Location url={region} />
        ) : (
          <>
            <h1>
              <u>Search by Region</u>
            </h1>
            <Link to="/">
              <BackButton back={"fromRegionList"} />
            </Link>
            <div className="region">
              <ListRegions />
            </div>
          </>
        )
      ) : (
        "Loading Regions, please wait..."
      )}
    </>
  );
}
