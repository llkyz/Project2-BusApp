import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import regionImg from "../Assets/Regions/regionImg";
import { LoadingImgLarge } from "../Assets/cleanup";

export default function RegionList() {
  const [regionList, setRegionList] = useState();

  useEffect(() => {
    const getRegionList = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_REGION
      );
      let data = await response.json();
      setRegionList(data.results);
    };
    getRegionList();
    // eslint-disable-next-line
  }, []);

  function ListRegions() {
    return regionList.map((data, index) => (
      <Link key={index} to={`/region/${data.url.split("/").slice(-2, -1)}`}>
        <div
          className="regionContainer"
          id={
            "region" +
            data.url.substring(data.url.length - 2, data.url.length - 1)
          }
        >
          <h1>{data.name.toUpperCase()}</h1>
          <div className="imageContainer">
            <img src={regionImg[data.name]} alt={data.name} />
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <>
      {regionList ? (
        <>
          <h1>
            <u>Search by Region</u>
          </h1>
          <div className="regionList">
            <ListRegions />
          </div>
        </>
      ) : (
        <LoadingImgLarge />
      )}
    </>
  );
}
