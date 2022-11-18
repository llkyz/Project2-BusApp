import React, { useState, useEffect } from "react";
import config from "../config";
import regionImg from "../Assets/regionImg";

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
        <p>{data.name.toUpperCase()}</p>
        <div className="imageContainer">
          <img src={regionImg[data.name]} alt={data.name} />
        </div>
      </div>
    ));
  }

  return (
    <>
      <h1>
        <u>Searching by Region</u>
      </h1>
      <div className="region">{regionData ? <ListRegions /> : ""}</div>
    </>
  );
}
